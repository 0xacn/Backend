import { S3 } from 'aws-sdk';
import DomainModel from '../models/DomainModel';
import { User } from '../models/UserModel';
import CounterModel from "../models/CounterModel";
import Axios, {Method} from "axios";

/**
 * The aws-S3 session.
 */
const s3 = new S3({
    credentials: {
        secretAccessKey: process.env.S3_SECRET_KEY,
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
    },
    endpoint: process.env.S3_ENDPOINT,
});

async function request(endpoint: string, method: Method, body?: object | string, headers?: object){
    try {
        const baseUrl = 'https://discord.com/api/v8';
        const { data } = await Axios({
            url: `${baseUrl}${endpoint}`,
            method,
            headers: headers ? headers: null,
            data: body ? body : null,
        });

        return data;
    } catch (err) {
        throw "Couldn't link your discord. Please make sure you are not in the 100 server limit";
    }
}

async function addPremium(user: User) {
    await this.request(`/guilds/${process.env.DISCORD_SERVER_ID}/members/${user.discord.id}/roles/806106770212126730`, 'PUT',
        null, {
            'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        }
    );
}

/**
 * Wipe a user's files.
 * @param {user} user The user's files to wipe.
 * @param {string} dir The directory to delete.
 */
async function wipeFiles(user: User, dir: string = `${user._id}/`) {
    const domains = await DomainModel.find({ userOnly: true, donatedBy: user._id });
    let count: number = 0;

    while (true) {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Prefix: dir,
        };

        if (domains.length !== 0) for (const domain of domains) {
            if (domain.userOnly) {
                params.Prefix = `${domain.name}/`;

                const domainObjects = await s3.listObjectsV2(params).promise();

                if (domainObjects.Contents.length !== 0) {
                    const deleteParams = {
                        Bucket: process.env.S3_BUCKET,
                        Delete: {
                            Objects: [],
                        },
                    };

                    for (const { Key } of domainObjects.Contents) {
                        deleteParams.Delete.Objects.push({ Key });
                    }

                    const deleted = await s3.deleteObjects(deleteParams).promise();
                    count += (deleted.Deleted as AWS.S3.DeletedObjects).length;
                }
            }
        }

        params.Prefix = `${user._id}/`;

        const objects = await s3.listObjectsV2(params).promise();

        if (objects.Contents.length !== 0) {
            const deleteParams = {
                Bucket: process.env.S3_BUCKET,
                Delete: {
                    Objects: [],
                },
            };

            for (const { Key } of objects.Contents) {
                deleteParams.Delete.Objects.push({ Key });
            }

            const deleted = await s3.deleteObjects(deleteParams).promise();
            count += (deleted.Deleted as AWS.S3.DeletedObjects).length;
        }

        if (!objects.IsTruncated) return count;
    }
}

export {
    s3,
    wipeFiles,
    addPremium,
    request
};
