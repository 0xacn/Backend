"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = new class CloudflareUtil {
    /**
     * Send a request to the cloudflare api.
     * @param {string} endpoint The endpoint to send a request to.
     * @param {Method} method The request method.
     * @param {object} body The request body.
     */
    async request(endpoint, method, body) {
        try {
            const baseUrl = 'https://api.cloudflare.com/client/v4';
            const { data } = await axios_1.default({
                url: `${baseUrl}${endpoint}`,
                method,
                headers: {
                    'X-Auth-Key': process.env.CLOUDFLARE_API_KEY,
                    'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
                    'Content-Type': 'application/json',
                },
                data: body ? body : null,
            });
            return data;
        }
        catch (err) {
            throw new Error(err.response.data.errors[0].message);
        }
    }
    /**
     * Add a domain to the cloudflare account.
     * @param {string} domain The domain to add.
     * @param {boolean} wildcard Whether or not the domain should be wildcarded.
     */
    async addDomain(domain, wildcard) {
        const data = await this.request('/zones', 'POST', {
            name: domain,
            account: {
                id: process.env.CLOUDFLARE_ACCOUNT_ID,
            },
        }).catch((e) => console.log(e));
        const id = data.result.id;
        await this.setRecords(domain, wildcard, id);
        await this.setSettings(id);
    }
    /**
     * Delete a zone from the cloudflare account.
     * @param {string} domain The domain to delete.
     */
    async deleteZone(domain) {
        const { result } = await this.request(`/zones?name=${domain}`, 'GET');
        const { id } = result[0];
        await this.request(`/zones/${id}`, 'DELETE');
    }
    /**
     * Setup dns records for a new domain.
     * @param {string} domain The domain name.
     * @param {boolean} wildcard Whether or not the domain should be wildcarded.
     * @param {string} id The zone id.
     */
    async setRecords(domain, wildcard, id) {
        await this.request(`/zones/${id}/dns_records`, 'POST', {
            type: 'CNAME',
            name: '@',
            content: 'i.dny.wtf',
            ttl: 1,
            proxied: true,
        });
        if (wildcard)
            await this.request(`/zones/${id}/dns_records`, 'POST', {
                type: 'CNAME',
                name: '*',
                content: domain,
                ttl: 1,
            });
    }
    /**
     * Setup the ssl settings for a new domain.
     * @param {string} id The zone id.
     */
    async setSettings(id) {
        await this.request(`/zones/${id}/settings/ssl`, 'PATCH', {
            value: 'flexible',
        });
        await this.request(`/zones/${id}/settings/always_use_https`, 'PATCH', {
            value: 'on',
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xvdWRmbGFyZVV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvQ2xvdWRmbGFyZVV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBc0M7QUFFdEMsa0JBQWUsSUFBSSxNQUFNLGNBQWM7SUFDbkM7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQWdCLEVBQUUsTUFBYyxFQUFFLElBQWE7UUFDekQsSUFBSTtZQUNBLE1BQU0sT0FBTyxHQUFHLHNDQUFzQyxDQUFDO1lBQ3ZELE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLGVBQUssQ0FBQztnQkFDekIsR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLFFBQVEsRUFBRTtnQkFDNUIsTUFBTTtnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCO29CQUM1QyxjQUFjLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7b0JBQzVDLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTthQUMzQixDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4RDtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFjLEVBQUUsUUFBaUI7UUFDN0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUU7WUFDOUMsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCO2FBQ3hDO1NBQ0osQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRTFCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFjO1FBQzNCLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxNQUFNLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBYyxFQUFFLFFBQWlCLEVBQUUsRUFBVTtRQUMxRCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUU7WUFDbkQsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsR0FBRztZQUNULE9BQU8sRUFBRSxXQUFXO1lBQ3BCLEdBQUcsRUFBRSxDQUFDO1lBQ04sT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRO1lBQUUsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFO2dCQUNqRSxJQUFJLEVBQUUsT0FBTztnQkFDYixJQUFJLEVBQUUsR0FBRztnQkFDVCxPQUFPLEVBQUUsTUFBTTtnQkFDZixHQUFHLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQVU7UUFDeEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFO1lBQ3JELEtBQUssRUFBRSxVQUFVO1NBQ3BCLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsNEJBQTRCLEVBQUUsT0FBTyxFQUFFO1lBQ2xFLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXhpb3MsIHsgTWV0aG9kIH0gZnJvbSAnYXhpb3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IGNsYXNzIENsb3VkZmxhcmVVdGlsIHtcclxuICAgIC8qKlxyXG4gICAgICogU2VuZCBhIHJlcXVlc3QgdG8gdGhlIGNsb3VkZmxhcmUgYXBpLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVuZHBvaW50IFRoZSBlbmRwb2ludCB0byBzZW5kIGEgcmVxdWVzdCB0by5cclxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBtZXRob2QgVGhlIHJlcXVlc3QgbWV0aG9kLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGJvZHkgVGhlIHJlcXVlc3QgYm9keS5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVxdWVzdChlbmRwb2ludDogc3RyaW5nLCBtZXRob2Q6IE1ldGhvZCwgYm9keT86IG9iamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9hcGkuY2xvdWRmbGFyZS5jb20vY2xpZW50L3Y0JztcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBBeGlvcyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2Jhc2VVcmx9JHtlbmRwb2ludH1gLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdYLUF1dGgtS2V5JzogcHJvY2Vzcy5lbnYuQ0xPVURGTEFSRV9BUElfS0VZLFxyXG4gICAgICAgICAgICAgICAgICAgICdYLUF1dGgtRW1haWwnOiBwcm9jZXNzLmVudi5DTE9VREZMQVJFX0VNQUlMLFxyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogYm9keSA/IGJvZHkgOiBudWxsLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyLnJlc3BvbnNlLmRhdGEuZXJyb3JzWzBdLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIGRvbWFpbiB0byB0aGUgY2xvdWRmbGFyZSBhY2NvdW50LlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIHRvIGFkZC5cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd2lsZGNhcmQgV2hldGhlciBvciBub3QgdGhlIGRvbWFpbiBzaG91bGQgYmUgd2lsZGNhcmRlZC5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgYWRkRG9tYWluKGRvbWFpbjogc3RyaW5nLCB3aWxkY2FyZDogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnJlcXVlc3QoJy96b25lcycsICdQT1NUJywge1xyXG4gICAgICAgICAgICBuYW1lOiBkb21haW4sXHJcbiAgICAgICAgICAgIGFjY291bnQ6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBwcm9jZXNzLmVudi5DTE9VREZMQVJFX0FDQ09VTlRfSUQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSkuY2F0Y2goKGUpID0+IGNvbnNvbGUubG9nKGUpKTtcclxuXHJcbiAgICAgICAgY29uc3QgaWQgPSBkYXRhLnJlc3VsdC5pZDtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRSZWNvcmRzKGRvbWFpbiwgd2lsZGNhcmQsIGlkKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldFNldHRpbmdzKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZSBhIHpvbmUgZnJvbSB0aGUgY2xvdWRmbGFyZSBhY2NvdW50LlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIHRvIGRlbGV0ZS5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgZGVsZXRlWm9uZShkb21haW46IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHsgcmVzdWx0IH0gPSBhd2FpdCB0aGlzLnJlcXVlc3QoYC96b25lcz9uYW1lPSR7ZG9tYWlufWAsICdHRVQnKTtcclxuICAgICAgICBjb25zdCB7IGlkIH0gPSByZXN1bHRbMF07XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMucmVxdWVzdChgL3pvbmVzLyR7aWR9YCwgJ0RFTEVURScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgZG5zIHJlY29yZHMgZm9yIGEgbmV3IGRvbWFpbi5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lLlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB3aWxkY2FyZCBXaGV0aGVyIG9yIG5vdCB0aGUgZG9tYWluIHNob3VsZCBiZSB3aWxkY2FyZGVkLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSB6b25lIGlkLlxyXG4gICAgICovXHJcbiAgICBhc3luYyBzZXRSZWNvcmRzKGRvbWFpbjogc3RyaW5nLCB3aWxkY2FyZDogYm9vbGVhbiwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVxdWVzdChgL3pvbmVzLyR7aWR9L2Ruc19yZWNvcmRzYCwgJ1BPU1QnLCB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdDTkFNRScsXHJcbiAgICAgICAgICAgIG5hbWU6ICdAJyxcclxuICAgICAgICAgICAgY29udGVudDogJ2kuZG55Lnd0ZicsXHJcbiAgICAgICAgICAgIHR0bDogMSxcclxuICAgICAgICAgICAgcHJveGllZDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHdpbGRjYXJkKSBhd2FpdCB0aGlzLnJlcXVlc3QoYC96b25lcy8ke2lkfS9kbnNfcmVjb3Jkc2AsICdQT1NUJywge1xyXG4gICAgICAgICAgICB0eXBlOiAnQ05BTUUnLFxyXG4gICAgICAgICAgICBuYW1lOiAnKicsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGRvbWFpbixcclxuICAgICAgICAgICAgdHRsOiAxLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIHNzbCBzZXR0aW5ncyBmb3IgYSBuZXcgZG9tYWluLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSB6b25lIGlkLlxyXG4gICAgICovXHJcbiAgICBhc3luYyBzZXRTZXR0aW5ncyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZXF1ZXN0KGAvem9uZXMvJHtpZH0vc2V0dGluZ3Mvc3NsYCwgJ1BBVENIJywge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ2ZsZXhpYmxlJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZXF1ZXN0KGAvem9uZXMvJHtpZH0vc2V0dGluZ3MvYWx3YXlzX3VzZV9odHRwc2AsICdQQVRDSCcsIHtcclxuICAgICAgICAgICAgdmFsdWU6ICdvbicsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==