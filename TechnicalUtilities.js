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
                "id": "TechnicaUtilitiesTTP",
                "name": "Technical Utilities",
                "color1": "#666666",
                "color2": "#000000",
                "blocks": blocks,
                "menus": menus
            }
        }
    }
    blocks.push({
        blockType: Scratch.BlockType.LABEL,
        hideFromPalette: ((value) => typeof value === 'string' && (value === 'true' || value === 'false') ? value === 'true' : Boolean(value))(),
        text: `Goodies`,
    });

    blocks.push({
        opcode: "block1",
        blockType: Scratch.BlockType.COMMAND,
        text: "alert [input1]",
        arguments: {
            "input1": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block1"] = async (args, util) => {
        alert(args["input1"])
    };

    blocks.push({
        opcode: "block1-1",
        blockType: Scratch.BlockType.REPORTER,
        text: "prompt [input1-1]",
        arguments: {
            "input1-1": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'What\'s your name?',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block1-1"] = async (args, util) => {
        return prompt(args["input1-1"])
    };

    blocks.push({
        opcode: "block1-1-1",
        blockType: Scratch.BlockType.REPORTER,
        text: "prompt [input1-1-1] with default value [input1-1-2]",
        arguments: {
            "input1-1-1": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'What\'s your name?',
            },
            "input1-1-2": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'default value here',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block1-1-1"] = async (args, util) => {
        return prompt(args["input1-1-1"], args["input1-1-2"])
    };

    blocks.push({
        opcode: "block1-2",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "confirm [input1-2]",
        arguments: {
            "input1-2": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Are you sure?',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block1-2"] = async (args, util) => {
        return confirm(args["input1-2"])
    };

    blocks.push({
        blockType: Scratch.BlockType.XML,
        xml: `<sep gap='48'/>`,
    });

    blocks.push({
        opcode: "block2",
        blockType: Scratch.BlockType.COMMAND,
        text: "[input3][input2]",
        arguments: {
            "input2": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello, world!',
            },
            "input3": {
                type: Scratch.ArgumentType.STRING,
                menu: 'menu1'
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block2"] = async (args, util) => {
        switch (args["input3"]) {
            case ('log'):
                console.log(args["input2"]);
                break;

            case ('warn'):
                console.warn(args["input2"]);
                break;

            case ('error'):
                console.error(args["input2"]);
                break;

            case ('info'):
                console.info(args["input2"]);
                break;

            default:
        };
    };

    blocks.push({
        opcode: "block2-1",
        blockType: Scratch.BlockType.COMMAND,
        text: "clear console",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block2-1"] = async (args, util) => {
        console.clear();
    };

    blocks.push({
        blockType: Scratch.BlockType.XML,
        xml: `<sep gap='48'/>`,
    });

    blocks.push({
        opcode: "block3",
        blockType: Scratch.BlockType.REPORTER,
        text: "json parse [input3]",
        arguments: {
            "input3": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2,3]',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block3"] = async (args, util) => {
        return JSON.parse(args["input3"])
    };

    blocks.push({
        opcode: "block4",
        blockType: Scratch.BlockType.REPORTER,
        text: "blank [input4] as string",
        arguments: {
            "input4": {
                type: Scratch.ArgumentType.STRING,
                menu: 'menu2'
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block4"] = async (args, util) => {
        switch (args["input4"]) {
            case ('object'):
                return '{}'

            case ('array'):
                return '[]'

            default:
                return '?'

        };
    };

    blocks.push({
        blockType: Scratch.BlockType.XML,
        xml: `<sep gap='48'/>`,
    });

    blocks.push({
        opcode: "block5",
        blockType: Scratch.BlockType.REPORTER,
        text: "current date and time",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block5"] = async (args, util) => {
        return new Date()
    };

    blocks.push({
        blockType: Scratch.BlockType.XML,
        xml: `<sep gap='48'/>`,
    });

    blocks.push({
        opcode: "block6",
        blockType: Scratch.BlockType.COMMAND,
        text: "evaluate [input5]",
        arguments: {
            "input5": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'alert(\"Hello!\")',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block6"] = async (args, util) => {
        eval(args["input5"]);
    };

    blocks.push({
        opcode: "block7",
        blockType: Scratch.BlockType.REPORTER,
        text: "evaluate [input6]",
        arguments: {
            "input6": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1 + 1',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block7"] = async (args, util) => {
        return eval(args["input6"])
    };

    blocks.push({
        opcode: "block8",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "evaluate [input7]",
        arguments: {
            "input7": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'true || false',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block8"] = async (args, util) => {
        return Boolean(eval(args["input7"]))
    };

    blocks.push({
        blockType: Scratch.BlockType.LABEL,
        hideFromPalette: ((value) => typeof value === 'string' && (value === 'true' || value === 'false') ? value === 'true' : Boolean(value))(),
        text: `Comments`,
    });

    blocks.push({
        opcode: "block9",
        blockType: Scratch.BlockType.COMMAND,
        text: "// [input8]",
        arguments: {
            "input8": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block9"] = async (args, util) => {};

    blocks.push({
        opcode: "block10",
        blockType: Scratch.BlockType.REPORTER,
        text: "[empty1] // [input9]",
        arguments: {
            "input9": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment',
            },
            "empty1": {
                type: Scratch.ArgumentType.empty,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block10"] = async (args, util) => {
        return args["empty1"]
    };

    blocks.push({
        opcode: "block11",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[empty2] // [input10]",
        arguments: {
            "input10": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment',
            },
            "empty2": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block11"] = async (args, util) => {
        return args["empty2"]
    };

    blocks.push({
        opcode: "block12",
        blockType: Scratch.BlockType.EVENT,
        text: "// [input11]",
        arguments: {
            "input11": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["block12"] = async (args, util) => {};

    blocks.push({
        blockType: Scratch.BlockType.LABEL,
        hideFromPalette: ((value) => typeof value === 'string' && (value === 'true' || value === 'false') ? value === 'true' : Boolean(value))(),
        text: `Literals`,
    });

    blocks.push({
        opcode: "literal1",
        blockType: Scratch.BlockType.REPORTER,
        text: "string [literaltext]",
        arguments: {
            "literaltext": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'abc',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["literal1"] = async (args, util) => {
        return args["literaltext"]
    };

    blocks.push({
        opcode: "literal2",
        blockType: Scratch.BlockType.REPORTER,
        text: "number [literalnumber]",
        arguments: {
            "literalnumber": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 123,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["literal2"] = async (args, util) => {
        return args["literalnumber"]
    };

    blocks.push({
        opcode: "literal2-1",
        blockType: Scratch.BlockType.BOOLEAN,
        text: "[literalboolean]",
        arguments: {
            "literalboolean": {
                type: Scratch.ArgumentType.STRING,
                menu: 'menu3'
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["literal2-1"] = async (args, util) => {
        switch (args["literalboolean"]) {
            case ('true'):
                return true

            case ('false'):
                return false

            case ('random'):
                if (Boolean((Math.floor(Math.random() * (1 - 0 + 1) + 0) == 1))) {
                    return true

                } else {
                    return false

                };

            default:
                return '?'

        };
    };

    blocks.push({
        opcode: "literal3",
        blockType: Scratch.BlockType.REPORTER,
        text: "color [literalcolor]",
        arguments: {
            "literalcolor": {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#0088ff',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["literal3"] = async (args, util) => {
        return args["literalcolor"]
    };

    blocks.push({
        opcode: "literal4",
        blockType: Scratch.BlockType.REPORTER,
        text: "angle [literalangle]",
        arguments: {
            "literalangle": {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 90,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["literal4"] = async (args, util) => {
        return args["literalangle"]
    };

    blocks.push({
        opcode: "literal5",
        blockType: Scratch.BlockType.REPORTER,
        text: "matrix [literalmatrix]",
        arguments: {
            "literalmatrix": {
                type: Scratch.ArgumentType.MATRIX,
                defaultValue: '0000001010000001000101110',
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["literal5"] = async (args, util) => {
        return args["literalmatrix"]
    };

    blocks.push({
        opcode: "literal6",
        blockType: Scratch.BlockType.REPORTER,
        text: "note [literalnote]",
        arguments: {
            "literalnote": {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: 60,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["literal6"] = async (args, util) => {
        return args["literalnote"]
    };

    blocks.push({
        opcode: "literal7",
        blockType: Scratch.BlockType.REPORTER,
        text: "empty [literalempty]",
        arguments: {
            "literalempty": {
                type: Scratch.ArgumentType.empty,
            },
        },
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["literal7"] = async (args, util) => {
        return args["literalempty"]
    };

    blocks.push({
        opcode: "literalnull",
        blockType: Scratch.BlockType.REPORTER,
        text: "null",
        arguments: {},
        disableMonitor: true,
        isEdgeActivated: false
    });
    Extension.prototype["literalnull"] = async (args, util) => {
        return null
    };

    menus["menu1"] = {
        acceptReporters: false,
        items: ["log", "warn", "error", "info"]
    }

    menus["menu2"] = {
        acceptReporters: false,
        items: ["object", "array"]
    }

    menus["menu3"] = {
        acceptReporters: true,
        items: ["true", "false", "random"]
    }

    Scratch.extensions.register(new Extension());
})(Scratch);