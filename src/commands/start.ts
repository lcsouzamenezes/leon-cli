import * as typanion from 'typanion'
import { Command, Option } from 'clipanion'

import { LeonInstance } from '../services/LeonInstance.js'
import { log } from '../services/Log.js'

export class StartCommand extends Command {
  static paths = [['start']]

  static usage = {
    description: 'Start a Leon instance.'
  }

  public port = Option.String('--port', {
    description: 'Run a Leon instance with a specific port.',
    validator: typanion.isNumber()
  })

  public name = Option.String('--name', {
    description: 'Run a Leon instance with a specific name.'
  })

  async execute(): Promise<number> {
    try {
      const leonInstance = await LeonInstance.get(this.name)
      await leonInstance.incrementStartCount()
      await leonInstance.start(this.port)
      return 0
    } catch (error) {
      await log.error({
        error,
        commandPath: 'start'
      })
      return 1
    }
  }
}
