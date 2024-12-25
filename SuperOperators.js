(function(Scratch) {
    class Extension {
        getInfo() {
            return {
                id: "SuperOperators2030751",
                name: "Super Operators",
                color1: "#48be58",
                color2: "#3d9343",
                blocks: [
                    {
                        text: "[N1] + [N2] + [N3]",
                        opcode: "threeplus",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            N1: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            N2: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            N3: {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        text: "[N4] - [N5] - [N6]",
                        opcode: "threeminus",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            N4: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            N5: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            N6: {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        text: "[N7] * [N8] * [N9]",
                        opcode: "threetimes",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            N7: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            N8: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            N9: {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        text: "[N10] / [N11] / [N12]",
                        opcode: "threedivide",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            N10: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            N11: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            N12: {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        text: "evaluate [N13]",
                        opcode: "evaluate",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            N13: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "1 + 1"
                            }
                        }
                    },
                    {
                        text: "reverse string [N14]",
                        opcode: "reversestring",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            N14: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello, world!"
                            }
                        }
                    },
                    {
                        text: "π",
                        opcode: "piconst",
                        blockType: Scratch.BlockType.REPORTER,
                    },
                ],
            }
        }
        threeplus({ N1, N2, N3 }){
            return  N1 + N2 + N3;
        }
        threeminus({ N4, N5, N6 }){
            return  N4 - N5 - N6;
        }
        threetimes({ N7, N8, N9 }){
            return  N7 * N8 * N9;
        }
        threedivide({ N10, N11, N12 }){
            return  N10 / N11 / N12;
        }
        evaluate({ N13 }){
            return eval(N13);
        }
        reversestring({ N14 }){
            return N14.split("").reverse().join("");
        }
        piconst(){
            return 3.141592653589793;
        }
    }
    Scratch.extensions.register(new Extension())
}
)(Scratch)