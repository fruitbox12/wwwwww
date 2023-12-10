import mongoose, { Schema, models } from 'mongoose';
import shortId from '../utils/shortId'; // Import shortId utility function

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
            type: String // Reference to User model
            required: true
        }
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Workflow = models.Workflow || mongoose.model('Workflow', workflowSchema);

export default Workflow;
