(function(Scratch) {
    class Extension {
        getInfo() {
            return {
                id: "Extension4567466295",
                name: "JavaScript Evaluate",
                color1: "#bdad4d",
                color2: "#8a7e38",
                blocks: [
                    {
                        text: "eval[input1]",
                        opcode: "block1",
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            input1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "alert('Hello, world!')"
                            }
                        }
                    },
                    {
                        text: "eval[input2]",
                        opcode: "block2",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            input2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "1 + 1"
                            }
                        }
                    },
                    {
                        text: "eval[input3]",
                        opcode: "block3",
                        blockType: Scratch.BlockType.BOOLEAN,
                        arguments: {
                            input3: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "1 + 1 === 2"
                            }
                        }
                    },
                    {
                        text: "eval[input4]but it's yes or no instead",
                        opcode: "block4",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            input4: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "1 + 1 === 2"
                            }
                        }
                    },
                    {
                        text: "eval[input5]if true:[input6]if false:[input7]",
                        opcode: "block5",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            input5: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "1 + 1 === 2"
                            },
                            input6: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "it's true!"
                            },
                            input7: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "it's false!"
                            }
                        }
                    }
                ],
            }
        }
        block1({ input1 }){
            eval(input1)
        }
        block2({ input2 }){
            return eval(input2)
        }
        block3({ input3 }){
            return Boolean(eval(input3))
        }
        block4({ input4 }){
            if (Boolean(eval(input4)) === true) {
                return "yes"
            }
            else {
                return "no"
            }
        }
        block5({ input5, input6, input7 }){
            if (Boolean(eval(input5)) === true) {
                return input6
            }
            else {
                return input7
            }
        }
    }
    Scratch.extensions.register(new Extension())
}
)(Scratch)