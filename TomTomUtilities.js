/*
   This extension was made with TurboBuilder!
   https://turbobuilder-steel.vercel.app/
*/
(async function(Scratch) {
    const variables = {};
    const blocks = [];
    const menus = {};


    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!")
        return
    }

    function doSound(ab, cd, runtime) {
        const audioEngine = runtime.audioEngine;

        const fetchAsArrayBufferWithTimeout = (url) =>
            new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let timeout = setTimeout(() => {
                    xhr.abort();
                    reject(new Error("Timed out"));
                }, 5000);
                xhr.onload = () => {
                    clearTimeout(timeout);
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(`HTTP error ${xhr.status} while fetching ${url}`));
                    }
                };
                xhr.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error(`Failed to request ${url}`));
                };
                xhr.responseType = "arraybuffer";
                xhr.open("GET", url);
                xhr.send();
            });

        const soundPlayerCache = new Map();

        const decodeSoundPlayer = async (url) => {
            const cached = soundPlayerCache.get(url);
            if (cached) {
                if (cached.sound) {
                    return cached.sound;
                }
                throw cached.error;
            }

            try {
                const arrayBuffer = await fetchAsArrayBufferWithTimeout(url);
                const soundPlayer = await audioEngine.decodeSoundPlayer({
                    data: {
                        buffer: arrayBuffer,
                    },
                });
                soundPlayerCache.set(url, {
                    sound: soundPlayer,
                    error: null,
                });
                return soundPlayer;
            } catch (e) {
                soundPlayerCache.set(url, {
                    sound: null,
                    error: e,
                });
                throw e;
            }
        };

        const playWithAudioEngine = async (url, target) => {
            const soundBank = target.sprite.soundBank;

            let soundPlayer;
            try {
                const originalSoundPlayer = await decodeSoundPlayer(url);
                soundPlayer = originalSoundPlayer.take();
            } catch (e) {
                console.warn(
                    "Could not fetch audio; falling back to primitive approach",
                    e
                );
                return false;
            }

            soundBank.addSoundPlayer(soundPlayer);
            await soundBank.playSound(target, soundPlayer.id);

            delete soundBank.soundPlayers[soundPlayer.id];
            soundBank.playerTargets.delete(soundPlayer.id);
            soundBank.soundEffects.delete(soundPlayer.id);

            return true;
        };

        const playWithAudioElement = (url, target) =>
            new Promise((resolve, reject) => {
                const mediaElement = new Audio(url);

                mediaElement.volume = target.volume / 100;

                mediaElement.onended = () => {
                    resolve();
                };
                mediaElement
                    .play()
                    .then(() => {
                        // Wait for onended
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });

        const playSound = async (url, target) => {
            try {
                if (!(await Scratch.canFetch(url))) {
                    throw new Error(`Permission to fetch ${url} denied`);
                }

                const success = await playWithAudioEngine(url, target);
                if (!success) {
                    return await playWithAudioElement(url, target);
                }
            } catch (e) {
                console.warn(`All attempts to play ${url} failed`, e);
            }
        };

        playSound(ab, cd)
    }
    class Extension {
        getInfo() {
            return {
                "id": "Extension1852610",
                "name": "Tom Tom Utilities",
                "color1": "#00bfff",
                "color2": "#0088cc",
                "tbShow": true,
                "blocks": blocks,
                "menus": menus
            }
        }
    }
    blocks.push({
        opcode: "block1",
        blockType: Scratch.BlockType.REPORTER,
        text: "[input1]to the 2nd tetration",
        arguments: {
            "input1": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block1"] = async (args, util) => {
        return (args["input1"] ** args["input1"])
    };

    blocks.push({
        opcode: "block2",
        blockType: Scratch.BlockType.COMMAND,
        text: "alert[input2]",
        arguments: {
            "input2": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello, world!',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block2"] = async (args, util) => {
        alert(args["input2"])
    };

    blocks.push({
        opcode: "block3",
        blockType: Scratch.BlockType.REPORTER,
        text: "prompt[input3]",
        arguments: {
            "input3": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Enter a username:',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block3"] = async (args, util) => {
        return prompt(args["input3"])
    };

    blocks.push({
        opcode: "block4",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "confirm[input4]",
        arguments: {
            "input4": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Are you a human?',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block4"] = async (args, util) => {
        return confirm(args["input4"])
    };

    blocks.push({
        opcode: "block5",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[input5]and[input6]and[input7]",
        arguments: {
            "input5": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
            "input6": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
            "input7": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block5"] = async (args, util) => {
        return (args["input5"] && (args["input6"] && args["input7"]))
    };

    blocks.push({
        opcode: "block6",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[input8]or[input9]or[input10]",
        arguments: {
            "input8": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
            "input9": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
            "input10": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block6"] = async (args, util) => {
        return (args["input8"] || (args["input9"] || args["input10"]))
    };

    blocks.push({
        opcode: "block7",
        blockType: Scratch.BlockType.REPORTER,
        text: "get sprite\'s position as array",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block7"] = async (args, util) => {
        return String(('[' + ((((util.target !== undefined ? util.target.x : 0) + ',') + (util.target !== undefined ? util.target.y : 0)) + ']')))
    };

    Scratch.extensions.register(new Extension());
})(Scratch);