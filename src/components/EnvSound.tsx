import { useFrame, useThree } from '@react-three/fiber'
import React from 'react'
import { Audio, PositionalAudio, AudioListener } from 'three'

interface Props {
    rsc: any;
    map: any;
}

function rRand(max: number) {
    return Math.floor(max * Math.random());
}

function siRand(radius: number) {
    return (Math.random() - 0.5) * radius;
}

function EnvSound({ map, rsc }: Props) {
    const { camera } = useThree()  
    const [listener] = React.useState(() => new AudioListener())
    const [ambientSound] = React.useState(() => ({
        audio: new Audio(listener),
        rAudio: new PositionalAudio(listener),
        ambNo: -1,
        randomTime: 0,
    }))

    // Convert audio data to WebAudio buffer
    function createAudioBuffer(data: Uint8Array) {
        const buffer = listener.context.createBuffer(1, data.length / 2, 22050)
        const channelFloats = buffer.getChannelData(0)
        const dv = new DataView(data.buffer, data.byteOffset, data.length)
        for (let i = 0; i < data.length / 2; i++) {
            channelFloats[i] = dv.getInt16(i * 2, true) / 32767
        }
        return buffer;
    }

    // TODO implement some kind of transitional fade?
    // or queue ambient sound change for when current is finished?
    function setAmbientSound(idx: number, delta: number) {
        const ambSnd = rsc.ambientSounds[idx];

        if (ambientSound.ambNo !== idx) {
            console.log(`Selecting ambient sound ${idx}`)
            if (!ambSnd) {
                console.error(`Invalid ambient sound ${idx} selected`)
                return
            }

            // Create WebAudio buffer
            const buffer = createAudioBuffer(ambSnd.pcm)
            ambientSound.ambNo = idx;

            // Set random sound interval time
            ambientSound.randomTime = (ambSnd.rData[0].rFrequency / 2 + rRand(ambSnd.rData[0].rFrequency));
            console.log(ambientSound.randomTime)

            if (ambientSound.audio.isPlaying) {
                // Stop playing if already playing
                ambientSound.audio.stop();
            }
            // Setup buffer for new sound...
            ambientSound.audio.setBuffer(buffer)
            ambientSound.audio.setVolume(ambSnd.aVolume / 256)
            // ... and play
            ambientSound.audio.play()
        }

        if (ambientSound.ambNo >= 0 && ambSnd.rsfxCount > 0) {
            ambientSound.randomTime -= delta;
            if (ambientSound.randomTime <= 0) {
                ambientSound.randomTime = ambSnd.rData[0].rFrequency / 2 + rRand(ambSnd.rData[0].rFrequency);
                console.log(ambientSound.randomTime)
                console.log('Selecting random sound')
                const r = ambSnd.rData[rRand(ambSnd.rsfxCount)];
                const rBuffer = createAudioBuffer(rsc.randomSounds[r.rNumber].pcm)
                ambientSound.rAudio.position.set(
                    siRand(4096),
                    siRand(256),
                    siRand(4096),
                )
                ambientSound.rAudio.setBuffer(rBuffer)
                ambientSound.rAudio.setVolume(r.rVolume)
                ambientSound.rAudio.play()
            }
        }
    }

    React.useEffect(() => {
        ambientSound.audio.setLoop(true)
        ambientSound.rAudio.setLoop(false)
        ambientSound.rAudio.setRefDistance(75)
        camera.add(listener)
        camera.add(ambientSound.rAudio)

        return () => {
            ambientSound.ambNo = -1;
            ambientSound.audio.isPlaying && ambientSound.audio.stop()
            ambientSound.rAudio.isPlaying && ambientSound.rAudio.stop()
            camera.remove(listener)
        }
    })

    useFrame(({ camera }, delta) => {
        const tileX = Math.floor(camera.position.x / (map.tileSize * 2))
        const tileZ = Math.floor(camera.position.z / (map.tileSize * 2))
        setAmbientSound(map.ambientMap[tileZ * (map.mapSize / 2) + tileX ], delta)
    });

    return null
}

export default EnvSound;
