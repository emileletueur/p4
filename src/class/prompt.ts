import EventEmitter from "events";
import readline from "readline";

export class Prompt extends EventEmitter {
  public static eventEmitter = new EventEmitter();
  private static readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  public static SetColumnSelector() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("keypress", (_, key) => {
      if (key.name === "c" && key.ctrl === true) {
        process.exit();
      } else if (key.name === "down") {
        this.eventEmitter.emit("dropDisc");
        // console.log("Down arrow pressed");
      } else if (key.name === "left") {
        this.eventEmitter.emit("moveToLeft");
        // console.log("Left arrow pressed");
      } else if (key.name === "right") {
        this.eventEmitter.emit("moveToRight");
        // console.log("Right arrow pressed");
      } else if (key.name === "return") {
        this.eventEmitter.emit("continue");
        // console.log("Return pressed");
      } else {
        // console.log(`You pressed: ${key.name}`);
      }
    });
  }

  public static PromptForString(query: string): Promise<string> {
    return new Promise((resolve) => Prompt.readLine.question(query, resolve));
  }
}
