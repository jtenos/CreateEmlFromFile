const fs = require('fs')
const crypto = require('crypto')
const getEmailAddress = require('get-email-address')
const getOffset = require('get-offset')

const address = getEmailAddress()
const offset = getOffset()

const isValidDate = dt => !!Date.parse(dt)
const writeToFile = (text, outputFile) => fs.writeFileSync(outputFile, text)
const readInputFileFromArgs = () => fs.readFileSync(process.argv.slice(2)[0])
const bufferToBase64 = buffer => buffer.toString('base64')
const getUnique = () => crypto.randomBytes(16).toString('hex')
const getFileNameFromPath = path => path.split('/').pop()
const getDayOfWeek = date => new Date(1970, 0, date.getDate() + 4).toLocaleString('en-US', { weekday: 'short' });
const getFirst10 = str => str.substring(0, 10)
const getDateFromFileName = path => isValidDate(getFirst10(path)) ? new Date(path.substring(0, 11) + ` 12:00:00 ${getOffset()}`) : new Date()
const padZero = i => String(i).padStart(2, '0')
const getFormattedMonth = date => date.toLocaleString('default', { month: 'short' })
const getFormattedDate = date => `${getDayOfWeek(date)}, ${date.getDate()} ${getFormattedMonth(date)} ${date.getFullYear()} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())} ${offset}`

let lines = []
lines.push(`From: ${address}`)
lines.push('Mime-Version: 1.0')
lines.push(`Message-ID: <${getUnique()}@example.com>`)
lines.push(`Subject: ${getFileNameFromPath(process.argv[2])}`)
lines.push(`To: ${address}`)
lines.push(`Date: ${getFormattedDate(getDateFromFileName(process.argv[2]))}`)
lines.push('Content-Type: multipart/mixed; boundary="boundary"')
lines.push('')
lines.push('--boundary')
lines.push(`Content-Type: image/png; name="${getFileNameFromPath(process.argv[2])}"`)
lines.push(`Content-Disposition: inline; filename="${getFileNameFromPath(process.argv[2])}"`)
lines.push('Content-Transfer-Encoding: base64')
lines.push('')
lines.push(bufferToBase64(readInputFileFromArgs()))
lines.push('--boundary--')

writeToFile(lines.join('\n'), getFileNameFromPath(process.argv[2]) + '.eml')
