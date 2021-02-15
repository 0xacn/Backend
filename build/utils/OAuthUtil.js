"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = require("querystring");
class OAuth {
    constructor(code) {
        /**
         * Send a request to the discord api.
         * @param {string} endpoint The endpoint to send a request to.
         * @param {Method} method The request method.
         * @param {object} body The request body.
         * @param {object} headers The request headers.
         */
        this.request = async (endpoint, method, body, headers) => {
            try {
                const baseUrl = 'https://discord.com/api/v8';
                const { data } = await axios_1.default({
                    url: `${baseUrl}${endpoint}`,
                    method,
                    headers: headers ? headers : null,
                    data: body ? body : null,
                });
                return data;
            }
            catch (err) {
                throw new Error("Couldn't link your discord. Please make sure you are not in the 100 server limit");
            }
        };
        /**
         * Verify that an OAuth grant code is valid.
         * @param {string} request The request type, defaults to login.
         */
        this.validate = async (request = 'login') => {
            this.authorization = await this.request('/oauth2/token', 'POST', querystring_1.stringify({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                redirect_uri: request !== 'login' ? process.env.DISCORD_LINK_REDIRECT_URI : process.env.DISCORD_LOGIN_REDIRECT_URI,
                grant_type: 'authorization_code',
                code: this.code,
            }), {
                'Content-Type': 'application/x-www-form-urlencoded',
            });
        };
        /**
         * Get a user's basic information.
         * @return {DiscordUserInterface} The user's info.
         */
        this.getUser = async () => {
            this.user = await this.request('/users/@me', 'GET', null, {
                'Authorization': `Bearer ${this.authorization.access_token}`,
            });
            return this.user;
        };
        /**
         * Add a user to the discord server.
         * @param {User} user The user to add.
         */
        this.addGuildMember = async (user) => {
            const whitelistedRole = process.env.DISCORD_ROLES;
            let data = JSON.stringify({
                'access_token': this.authorization.access_token,
            });
            try {
                await this.request(`/guilds/${process.env.DISCORD_SERVER_ID}/members/${this.user.id}`, 'PUT', data, {
                    'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                });
            }
            catch (e) { }
            await this.request(`/guilds/${process.env.DISCORD_SERVER_ID}/members/${this.user.id}/roles/${whitelistedRole}`, 'PUT', null, {
                'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            });
            data = JSON.stringify({
                'roles': process.env.DISCORD_ROLES,
            });
            if (user.discord.id && user.discord.id !== this.user.id) {
                data = await this.request(`/guilds/${process.env.DISCORD_SERVER_ID}/members/${user.discord.id}`, 'GET', null, {
                    'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                    'Content-Type': 'application/json',
                });
                if (data.roles.includes(whitelistedRole))
                    await this.request(`/guilds/${process.env.DISCORD_SERVER_ID}/members/${user.discord.id}/roles/${whitelistedRole}`, 'DELETE', null, {
                        'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                        'Content-Type': 'application/json',
                    });
            }
        };
        this.code = code;
    }
}
exports.OAuth = OAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhVdGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL09BdXRoVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBc0M7QUFHdEMsNkNBQXdDO0FBR3hDLE1BQWEsS0FBSztJQWdCZCxZQUFZLElBQVk7UUFJeEI7Ozs7OztXQU1HO1FBQ0gsWUFBTyxHQUFHLEtBQUssRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxJQUFzQixFQUFFLE9BQWdCLEVBQWdCLEVBQUU7WUFDekcsSUFBSTtnQkFDQSxNQUFNLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztnQkFDN0MsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sZUFBSyxDQUFDO29CQUN6QixHQUFHLEVBQUUsR0FBRyxPQUFPLEdBQUcsUUFBUSxFQUFFO29CQUM1QixNQUFNO29CQUNOLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUMsSUFBSTtvQkFDaEMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO2lCQUMzQixDQUFDLENBQUM7Z0JBRUgsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsa0ZBQWtGLENBQUMsQ0FBQzthQUN2RztRQUNMLENBQUMsQ0FBQTtRQUVEOzs7V0FHRztRQUNILGFBQVEsR0FBRyxLQUFLLEVBQUUsVUFBa0IsT0FBTyxFQUFpQixFQUFFO1lBQzFELElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsdUJBQVMsQ0FBQztnQkFDdkUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCO2dCQUN4QyxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUI7Z0JBQ2hE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LE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUU7d0JBQ3ZELGNBQWMsRUFBRSxrQkFBa0I7cUJBQ3JDLENBQ0osQ0FBQzthQUNMO1FBQ0wsQ0FBQyxDQUFBO1FBbkdHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FtR0o7QUFySEQsc0JBcUhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF4aW9zLCB7IE1ldGhvZCB9IGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgQXV0aG9yaXphdGlvbkludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9BdXRob3JpemF0aW9uSW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRGlzY29yZFVzZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMvRGlzY29yZFVzZXJJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tICdxdWVyeXN0cmluZyc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvVXNlck1vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPQXV0aCB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSB1c2VyJ3MgYWNjZXNzIHRva2VuICYgcmVmcmVzaCB0b2tlbi5cclxuICAgICAqL1xyXG4gICAgYXV0aG9yaXphdGlvbjogQXV0aG9yaXphdGlvbkludGVyZmFjZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB1c2VyJ3MgYmFzaWMgaW5mb3JtYXRpb24uXHJcbiAgICAgKi9cclxuICAgIHVzZXI6IERpc2NvcmRVc2VySW50ZXJmYWNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIE9BdXRoMiBncmFudCBjb2RlLlxyXG4gICAgICovXHJcbiAgICBjb2RlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29kZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbmQgYSByZXF1ZXN0IHRvIHRoZSBkaXNjb3JkIGFwaS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbmRwb2ludCBUaGUgZW5kcG9pbnQgdG8gc2VuZCBhIHJlcXVlc3QgdG8uXHJcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbWV0aG9kIFRoZSByZXF1ZXN0IG1ldGhvZC5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBib2R5IFRoZSByZXF1ZXN0IGJvZHkuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaGVhZGVycyBUaGUgcmVxdWVzdCBoZWFkZXJzLlxyXG4gICAgICovXHJcbiAgICByZXF1ZXN0ID0gYXN5bmMgKGVuZHBvaW50OiBzdHJpbmcsIG1ldGhvZDogTWV0aG9kLCBib2R5Pzogb2JqZWN0IHwgc3RyaW5nLCBoZWFkZXJzPzogb2JqZWN0KTogUHJvbWlzZTxhbnk+ID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vZGlzY29yZC5jb20vYXBpL3Y4JztcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBBeGlvcyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2Jhc2VVcmx9JHtlbmRwb2ludH1gLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyA/IGhlYWRlcnM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBib2R5ID8gYm9keSA6IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGxpbmsgeW91ciBkaXNjb3JkLiBQbGVhc2UgbWFrZSBzdXJlIHlvdSBhcmUgbm90IGluIHRoZSAxMDAgc2VydmVyIGxpbWl0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZlcmlmeSB0aGF0IGFuIE9BdXRoIGdyYW50IGNvZGUgaXMgdmFsaWQuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdCBUaGUgcmVxdWVzdCB0eXBlLCBkZWZhdWx0cyB0byBsb2dpbi5cclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGUgPSBhc3luYyAocmVxdWVzdDogc3RyaW5nID0gJ2xvZ2luJyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0aG9yaXphdGlvbiA9IGF3YWl0IHRoaXMucmVxdWVzdCgnL29hdXRoMi90b2tlbicsICdQT1NUJywgc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgY2xpZW50X2lkOiBwcm9jZXNzLmVudi5ESVNDT1JEX0NMSUVOVF9JRCxcclxuICAgICAgICAgICAgY2xpZW50X3NlY3JldDogcHJvY2Vzcy5lbnYuRElTQ09SRF9DTElFTlRfU0VDUkVULFxyXG4gICAgICAgICAgICByZWRpcmVjdF91cmk6IHJlcXVlc3QgIT09ICdsb2dpbicgPyBwcm9jZXNzLmVudi5ESVNDT1JEX0xJTktfUkVESVJFQ1RfVVJJIDogcHJvY2Vzcy5lbnYuRElTQ09SRF9MT0dJTl9SRURJUkVDVF9VUkksXHJcbiAgICAgICAgICAgIGdyYW50X3R5cGU6ICdhdXRob3JpemF0aW9uX2NvZGUnLFxyXG4gICAgICAgICAgICBjb2RlOiB0aGlzLmNvZGUsXHJcbiAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgdXNlcidzIGJhc2ljIGluZm9ybWF0aW9uLlxyXG4gICAgICogQHJldHVybiB7RGlzY29yZFVzZXJJbnRlcmZhY2V9IFRoZSB1c2VyJ3MgaW5mby5cclxuICAgICAqL1xyXG4gICAgZ2V0VXNlciA9IGFzeW5jICgpOiBQcm9taXNlPERpc2NvcmRVc2VySW50ZXJmYWNlPiA9PiB7XHJcbiAgICAgICAgdGhpcy51c2VyID0gYXdhaXQgdGhpcy5yZXF1ZXN0KCcvdXNlcnMvQG1lJywgJ0dFVCcsIG51bGwsIHtcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dGhpcy5hdXRob3JpemF0aW9uLmFjY2Vzc190b2tlbn1gLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy51c2VyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSB1c2VyIHRvIHRoZSBkaXNjb3JkIHNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7VXNlcn0gdXNlciBUaGUgdXNlciB0byBhZGQuXHJcbiAgICAgKi9cclxuICAgIGFkZEd1aWxkTWVtYmVyID0gYXN5bmMgKHVzZXI6IFVzZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgICAgICBjb25zdCB3aGl0ZWxpc3RlZFJvbGUgPSBwcm9jZXNzLmVudi5ESVNDT1JEX1JPTEVTO1xyXG5cclxuICAgICAgICBsZXQgZGF0YTogYW55ID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAnYWNjZXNzX3Rva2VuJzogdGhpcy5hdXRob3JpemF0aW9uLmFjY2Vzc190b2tlbixcclxuICAgICAgICB9KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlcXVlc3QoYC9ndWlsZHMvJHtwcm9jZXNzLmVudi5ESVNDT1JEX1NFUlZFUl9JRH0vbWVtYmVycy8ke3RoaXMudXNlci5pZH1gLCAnUFVUJyxcclxuICAgICAgICAgICAgICAgIGRhdGEsIHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCb3QgJHtwcm9jZXNzLmVudi5ESVNDT1JEX0JPVF9UT0tFTn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogZGF0YS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7fVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLnJlcXVlc3QoYC9ndWlsZHMvJHtwcm9jZXNzLmVudi5ESVNDT1JEX1NFUlZFUl9JRH0vbWVtYmVycy8ke3RoaXMudXNlci5pZH0vcm9sZXMvJHt3aGl0ZWxpc3RlZFJvbGV9YCwgJ1BVVCcsXHJcbiAgICAgICAgICAgIG51bGwsIHtcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJvdCAke3Byb2Nlc3MuZW52LkRJU0NPUkRfQk9UX1RPS0VOfWAsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAncm9sZXMnOiBwcm9jZXNzLmVudi5ESVNDT1JEX1JPTEVTLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodXNlci5kaXNjb3JkLmlkICYmIHVzZXIuZGlzY29yZC5pZCAhPT0gdGhpcy51c2VyLmlkKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBhd2FpdCB0aGlzLnJlcXVlc3QoYC9ndWlsZHMvJHtwcm9jZXNzLmVudi5ESVNDT1JEX1NFUlZFUl9JRH0vbWVtYmVycy8ke3VzZXIuZGlzY29yZC5pZH1gLCAnR0VUJywgbnVsbCwge1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQm90ICR7cHJvY2Vzcy5lbnYuRElTQ09SRF9CT1RfVE9LRU59YCxcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEucm9sZXMuaW5jbHVkZXMod2hpdGVsaXN0ZWRSb2xlKSkgYXdhaXQgdGhpcy5yZXF1ZXN0KFxyXG4gICAgICAgICAgICAgICAgYC9ndWlsZHMvJHtwcm9jZXNzLmVudi5ESVNDT1JEX1NFUlZFUl9JRH0vbWVtYmVycy8ke3VzZXIuZGlzY29yZC5pZH0vcm9sZXMvJHt3aGl0ZWxpc3RlZFJvbGV9YCxcclxuICAgICAgICAgICAgICAgICdERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgbnVsbCwge1xyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJvdCAke3Byb2Nlc3MuZW52LkRJU0NPUkRfQk9UX1RPS0VOfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19