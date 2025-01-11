
            // Made with PenguinBuilder 3.6
            // use PenguinBuilder at "https://chickencuber.github.io/PenguinBuilder/"
            (async function(Scratch) {
                const blocks = [];
                const vars = {};
                const menus = {};

                function wait(m) {
                    return new Promise((r) => setTimeout(() => r(), m));
                }

                if (!Scratch.extensions.unsandboxed) {
                    throw new Error('JavaScript Console must run unsandboxed');
                }

                class Extension {
                    getInfo() {
                        return {
                            "id": "jsconsolettp",
                            "name": "JavaScript Console",
                            "color1": "#0022cc",
                            "blocks": blocks,
                            "menus": menus,
                        }
                    }
                }
                
blocks.push({
  opcode: "jsconsolettp_Block_block1",
  blockType: Scratch.BlockType.COMMAND,
  text: "console[input1][input2]",
  arguments: {
      "input1": {
    type: Scratch.ArgumentType.STRING,
    menu: "jsconsolettp_menu_0",
  },
  "input2": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: `Hello, world!`
    },

  },
  disableMonitor: true
});
Extension.prototype["jsconsolettp_Block_block1"] = async function(args, util) {
  const localVars = {};
    eval((['console.',args["input1"],'("',args["input2"],'")'].join('')));

};


blocks.push({
  opcode: "jsconsolettp_Block_block2",
  blockType: Scratch.BlockType.COMMAND,
  text: "[input3]the number[input4]",
  arguments: {
      "input3": {
    type: Scratch.ArgumentType.STRING,
    menu: "jsconsolettp_menu_1",
  },
  "input4": {
      type: Scratch.ArgumentType.NUMBER,
      defaultValue: `123`
    },

  },
  disableMonitor: true
});
Extension.prototype["jsconsolettp_Block_block2"] = async function(args, util) {
  const localVars = {};
    eval((['console.',args["input3"],'(',args["input4"],')'].join('')));

};


blocks.push({
  opcode: "jsconsolettp_Block_block3",
  blockType: Scratch.BlockType.COMMAND,
  text: "clear console",
  arguments: {

  },
  disableMonitor: true
});
Extension.prototype["jsconsolettp_Block_block3"] = async function(args, util) {
  const localVars = {};
    eval('console.clear()');

};


                
menus["jsconsolettp_menu_0"] = {
acceptReporters: false,
items: ['log', 'warn', 'error'],
};


menus["jsconsolettp_menu_1"] = {
acceptReporters: false,
items: ['log', 'warn', 'error'],
};


                
    (() => {
    const temp = [
          "jsconsolettp_Block_block1","jsconsolettp_Block_block2","jsconsolettp_Block_block3",
    ];
    blocks.sort((a, b) => {
        a = temp.indexOf(a.opcode);
        b = temp.indexOf(b.opcode);
        if(a === -1) {
          if(b === -1) {
            return 0;
          } else {
            return 1;
          }
        } else if(b === -1) {
          return -1;
        }
        return a - b;
      })
})();
                Scratch.extensions.register(new Extension());
            })(Scratch);
            