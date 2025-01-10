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
                "id": "OperatorUtilsTTP",
                "name": "Operator Utils",
                "color1": "#37b800",
                "color2": "#2d8000",
                "blocks": blocks,
                "menus": menus
            }
        }
    }
    blocks.push({
        opcode: "block1",
        blockType: Scratch.BlockType.REPORTER,
        text: "[input1]^^2",
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
        blockType: Scratch.BlockType.REPORTER,
        text: "next step of Collatz Conjecture in number[input2]",
        arguments: {
            "input2": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block2"] = async (args, util) => {
        if (Boolean(((args["input2"] % 2) === 0))) {
            return (args["input2"] / 2)

        } else {
            return ((args["input2"] * 3) + 1)

        };
    };

    menus["menu1"] = {
        acceptReporters: false,
        items: [...[...[...[...[], 'pi'], 'e'], 'golden ratio'], 'infinity']
    }

    menus["menu2"] = {
        acceptReporters: false,
        items: [...[...[...[...[...[...[], 'and'], 'or'], 'xor'], 'nand'], 'nor'], 'xnor']
    }

    menus["menu3"] = {
        acceptReporters: false,
        items: [...[...[], 'first'], 'last']
    }

    blocks.push({
        opcode: "block3",
        blockType: Scratch.BlockType.REPORTER,
        text: "constant[input3]",
        arguments: {
            "input3": {
                type: Scratch.ArgumentType.STRING,
                menu: 'menu1'
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block3"] = async (args, util) => {
        switch (args["input3"]) {
            case ('pi'):
                return Math.PI

            case ('e'):
                return Math.E

            case ('golden ratio'):
                return ((1 + 2.23606797749979) / 2)

            case ('infinity'):
                return (1 / 0)

            default:
                console.error('Invalid option.');

        };
    };

    blocks.push({
        opcode: "block4",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[input4][input5][input6]",
        arguments: {
            "input4": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
            "input5": {
                type: Scratch.ArgumentType.STRING,
                menu: 'menu2'
            },
            "input6": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block4"] = async (args, util) => {
        switch (args["input5"]) {
            case ('and'):
                return (args["input4"] && args["input6"])

            case ('or'):
                return (args["input4"] || args["input6"])

            case ('xor'):
                return Boolean(args["input4"] ^ args["input6"])

            case ('nand'):
                return !(args["input4"] && args["input6"])

            case ('nor'):
                return !(args["input4"] || args["input6"])

            case ('xnor'):
                return !Boolean(args["input4"] ^ args["input6"])

            default:
                console.error('Invalid option.');

        };
    };

    blocks.push({
        opcode: "block5",
        blockType: Scratch.BlockType.REPORTER,
        text: "[input5]letter of[input6]",
        arguments: {
            "input5": {
                type: Scratch.ArgumentType.STRING,
                menu: 'menu3'
            },
            "input6": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block5"] = async (args, util) => {
        if (Boolean((args["input6"] == ''))) {
            return ''

        } else {
            switch (args["input5"]) {
                case ('first'):
                    return (args["input6"].split("")[1 - 1])

                case ('last'):
                    return (args["input6"].split("")[(args["input6"].length) - 1])

                default:
                    console.error('Invalid option.');

            };

        };
    };

    Scratch.extensions.register(new Extension());
})(Scratch);