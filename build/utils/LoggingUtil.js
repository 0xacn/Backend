"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logCustomDomain = exports.logDomains = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Log a list of new domains to the domain notifications channel.
 * @param {Domain[]} domains The domain that was created.
 */
async function logDomains(domains) {
    const grammar = domains.length > 1 ? `**${domains.length}** new domains have` : 'A new domain has';
    const domainList = domains.map((d) => (d.wildcard ? '*.' : '') + d.name).join(',\n');
    await axios_1.default.post(process.env.WEBHOOK_URL, {
        embeds: [
            {
                title: `${grammar} been added, DNS records have automatically been updated.`,
                description: `\`\`\`${domainList}\`\`\``
            },
        ],
    });
}
exports.logDomains = logDomains;
;
/**
 * Log a single custom domain to the webhook in the server.
 * @param {Domain} domain The domain.
 */
async function logCustomDomain(domain) {
    await axios_1.default.post(process.env.CUSTOM_DOMAIN_WEBHOOK, {
        embeds: [
            {
                title: 'A new domain has been added',
                fields: [
                    {
                        name: 'Name',
                        value: `[${domain.name}](https://${domain.name})`,
                    },
                    {
                        name: 'Wildcard',
                        value: domain.wildcard ? 'Yes' : 'No',
                    },
                    {
                        name: 'Donator',
                        value: domain.donatedBy,
                    },
                    {
                        name: 'User Only',
                        value: domain.userOnly ? 'Yes' : 'No',
                    },
                ],
            },
        ],
    });
}
exports.logCustomDomain = logCustomDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2luZ1V0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvTG9nZ2luZ1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBRzFCOzs7R0FHRztBQUNILEtBQUssVUFBVSxVQUFVLENBQUMsT0FBaUI7SUFDdkMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLE1BQU0scUJBQXFCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0lBQ25HLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJGLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtRQUN0QyxNQUFNLEVBQUU7WUFDSjtnQkFDSSxLQUFLLEVBQUUsR0FBRyxPQUFPLDJEQUEyRDtnQkFDNUUsV0FBVyxFQUFFLFNBQVMsVUFBVSxRQUFRO2FBQzNDO1NBQ0o7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBbUNHLGdDQUFVO0FBbkNiLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxLQUFLLFVBQVUsZUFBZSxDQUFDLE1BQWM7SUFDekMsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUU7UUFDaEQsTUFBTSxFQUFFO1lBQ0o7Z0JBQ0ksS0FBSyxFQUFFLDZCQUE2QjtnQkFDcEMsTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxNQUFNO3dCQUNaLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLGFBQWEsTUFBTSxDQUFDLElBQUksR0FBRztxQkFDcEQ7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUk7cUJBQ3hDO29CQUNEO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUztxQkFDMUI7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUk7cUJBQ3hDO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFJRywwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBeGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IERvbWFpbiB9IGZyb20gJy4uL21vZGVscy9Eb21haW5Nb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9nIGEgbGlzdCBvZiBuZXcgZG9tYWlucyB0byB0aGUgZG9tYWluIG5vdGlmaWNhdGlvbnMgY2hhbm5lbC5cclxuICogQHBhcmFtIHtEb21haW5bXX0gZG9tYWlucyBUaGUgZG9tYWluIHRoYXQgd2FzIGNyZWF0ZWQuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBsb2dEb21haW5zKGRvbWFpbnM6IERvbWFpbltdKSB7XHJcbiAgICBjb25zdCBncmFtbWFyID0gZG9tYWlucy5sZW5ndGggPiAxID8gYCoqJHtkb21haW5zLmxlbmd0aH0qKiBuZXcgZG9tYWlucyBoYXZlYCA6ICdBIG5ldyBkb21haW4gaGFzJztcclxuICAgIGNvbnN0IGRvbWFpbkxpc3QgPSBkb21haW5zLm1hcCgoZCkgPT4gKGQud2lsZGNhcmQgPyAnKi4nIDogJycpICsgZC5uYW1lKS5qb2luKCcsXFxuJyk7XHJcblxyXG4gICAgYXdhaXQgQXhpb3MucG9zdChwcm9jZXNzLmVudi5XRUJIT09LX1VSTCwge1xyXG4gICAgICAgIGVtYmVkczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogYCR7Z3JhbW1hcn0gYmVlbiBhZGRlZCwgRE5TIHJlY29yZHMgaGF2ZSBhdXRvbWF0aWNhbGx5IGJlZW4gdXBkYXRlZC5gLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBcXGBcXGBcXGAke2RvbWFpbkxpc3R9XFxgXFxgXFxgYFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2cgYSBzaW5nbGUgY3VzdG9tIGRvbWFpbiB0byB0aGUgd2ViaG9vayBpbiB0aGUgc2VydmVyLlxyXG4gKiBAcGFyYW0ge0RvbWFpbn0gZG9tYWluIFRoZSBkb21haW4uXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBsb2dDdXN0b21Eb21haW4oZG9tYWluOiBEb21haW4pIHtcclxuICAgIGF3YWl0IEF4aW9zLnBvc3QocHJvY2Vzcy5lbnYuQ1VTVE9NX0RPTUFJTl9XRUJIT09LLCB7XHJcbiAgICAgICAgZW1iZWRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnQSBuZXcgZG9tYWluIGhhcyBiZWVuIGFkZGVkJyxcclxuICAgICAgICAgICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ05hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYFske2RvbWFpbi5uYW1lfV0oaHR0cHM6Ly8ke2RvbWFpbi5uYW1lfSlgLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnV2lsZGNhcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZG9tYWluLndpbGRjYXJkID8gJ1llcycgOiAnTm8nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnRG9uYXRvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkb21haW4uZG9uYXRlZEJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnVXNlciBPbmx5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRvbWFpbi51c2VyT25seSA/ICdZZXMnIDogJ05vJyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBsb2dEb21haW5zLFxyXG4gICAgbG9nQ3VzdG9tRG9tYWluXHJcbn07XHJcbiJdfQ==