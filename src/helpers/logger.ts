import { createLogger, format, transports } from 'winston'
const { combine, timestamp, prettyPrint, colorize, errors, label  } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    errors({ stack: true }), // <-- use errors format
    colorize(),
    timestamp(),
    prettyPrint(),
    label()
  ),
  defaultMeta: { service: 'zip-api-service' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/info.log', level: 'info' }),
  ],
})

function getStackTrace (error: Error): string {
    let stack: any = error.stack || '';
    stack = stack.split('\n').map(function (line) { return line.trim(); });
    return stack.splice(stack[0] == 'Error' ? 2 : 1);
}

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }))
}

export const logMessage = (inputData: any, level: string = 'error') => {
    let commonTypes = [String, Boolean, Number, Error]
    let isInputDataACommonValue = false
    let message = inputData
    
    commonTypes.forEach(type => {
        if(inputData instanceof type){
            isInputDataACommonValue = true
            message = inputData.toString()
            return
        }
    })

    if(!isInputDataACommonValue){
        message = JSON.stringify(inputData, null, 4)
    }else if(inputData instanceof Error){
        message = getStackTrace(inputData)
    }

    logger.log({
        message,
        level
    })
}