import mongoose, { Schema, models } from 'mongoose';
 * @param {string | Date} prefix Identifies the Entity, 'W' for Workflow, 'E' for Execution
 * @param {Date} date The Date the ShortId was created
 * @returns {string} shortId
 */

     const RANDOM_LENGTH = 8
const DICTIONARY_1 = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
const DICTIONARY_3 = 'abcdefghijklmnopqrstuvwxyz0123456789'

 const shortId = (prefix: 'W' | 'E', date: string | Date): string => {
    const isValidPrefix = prefix === 'W' || prefix === 'E'
    const utcCreatedAt = new Date(date)
    if (!isValidPrefix) throw new Error('Invalid short id prefix, only possible values "W" or "E".')
    const DICTIONARY = DICTIONARY_1
    let randomPart = ''
    for (let i = 0; i < RANDOM_LENGTH; i++) {
        randomPart += getRandomCharFromDictionary(DICTIONARY)
    }
    const sanitizedDate = formatDateForShortID(utcCreatedAt)
    return `${prefix}${sanitizedDate}-${randomPart}`
}

/**
 * Format a date for use in the short id DDMMMYY with no hyphens
 * @param {Date} date
 * @returns {string} the sanitized date as string ie: 10JAN21
 */
 const formatDateForShortID = (date: Date): string => {
    const localDate = moment(date)
    return localDate.format('DDMMMYY').toUpperCase()
}

 const getRandomCharFromDictionary = (dictionary: string) => {
    const minDec = 0
    const maxDec = dictionary.length + 1
    const randDec = Math.floor(Math.random() * (maxDec - minDec) + minDec)
    return dictionary.charAt(randDec)
}

 const getRandomSubdomain = () => {
    let randomPart = ''
    for (let i = 0; i < 24; i++) {
        randomPart += getRandomCharFromDictionary(DICTIONARY_3)
    }
    return randomPart
}
const workflowSchema = new Schema(
    {
        shortId: {
            type: String,
            default: () => shortId('W', new Date()), // Generate shortId on creation
            unique: true, // Ensure uniqueness
            index: true // Create an index for faster queries
        },
        name: {
            type: String,
            required: true
        },
        flowData: {
            type: String, // Or use a more complex type if needed
            required: true
        },
        deployed: {
            type: Boolean,
            default: false // Default value
        },
        userId: {
            type: String,
            required: true
        }
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Workflow = models.Workflow || mongoose.model('Workflow', workflowSchema);

export default Workflow;
