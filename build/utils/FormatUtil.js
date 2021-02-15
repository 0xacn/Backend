"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatExtension = exports.formatEmbed = exports.formatFilesize = void 0;
const path_1 = require("path");
/**
 * Format a file size to a human readable format.
 * @param {number} size The filesize in bytes.
 * @return {string} The formatted filesize.
 */
function formatFilesize(size) {
    if (size === 0)
        return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const int = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, int)).toFixed(2)} ${sizes[int]}`;
}
exports.formatFilesize = formatFilesize;
/**
 * Format a file size to a human readable format.
 * @param {string} filename The original filename.
 * @return {string} The formatted filesize.
 */
function formatExtension(file) {
    let extension = path_1.extname(file.originalname);
    if (extension === "") {
        extension = ".png";
        file.mimetype = "image/png";
    }
    return extension;
}
exports.formatExtension = formatExtension;
/**
 * Format a embed to fill out the templates.
 * @param {EmbedInterface} embed The embed settings.
 * @param {User} user The user who set the embed settings.
 * @param {File} file The file, if needed.
 * @return {EmbedInterface} The formatted embed.
 */
function formatEmbed(embed, user, file) {
    for (const field of ['title', 'description', 'author']) {
        if (embed[field]) {
            if (embed[field] === 'default') {
                switch (field) {
                    case 'title':
                        embed[field] = file.filename;
                        break;
                    case 'description':
                        embed[field] = `Uploaded at ${new Date(file.timestamp).toLocaleString()} by ${user.username}`;
                        break;
                    case 'author':
                        embed[field] = user.username;
                }
            }
            else {
                embed[field] = embed[field]
                    .replace('{size}', file.size)
                    .replace('{username}', user.username)
                    .replace('{filename}', file.filename)
                    .replace('{uploads}', user.uploads)
                    .replace('{date}', file.timestamp.toLocaleDateString())
                    .replace('{time}', file.timestamp.toLocaleTimeString())
                    .replace('{timestamp}', file.timestamp.toLocaleString());
                const TIMEZONE_REGEX = /{(time|timestamp):([^}]+)}/i;
                let match = embed[field].match(TIMEZONE_REGEX);
                while (match) {
                    try {
                        const formatted = match[1] === 'time' ? file.timestamp.toLocaleTimeString('en-US', {
                            timeZone: match[2],
                        }) : file.timestamp.toLocaleString('en-US', {
                            timeZone: match[2],
                        });
                        embed[field] = embed[field].replace(match[0], formatted);
                        match = embed[field].match(TIMEZONE_REGEX);
                    }
                    catch (err) {
                        break;
                    }
                }
            }
        }
    }
    if (embed.randomColor)
        embed.color = `#${((1 << 24) * Math.random() | 0).toString(16)}`;
    return embed;
}
exports.formatEmbed = formatEmbed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybWF0VXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Gb3JtYXRVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLCtCQUErQjtBQUUvQjs7OztHQUlHO0FBQ0gsU0FBUyxjQUFjLENBQUMsSUFBWTtJQUNoQyxJQUFJLElBQUksS0FBSyxDQUFDO1FBQ1YsT0FBTyxLQUFLLENBQUM7SUFFakIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXhELE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUN0RSxDQUFDO0FBNEVHLHdDQUFjO0FBMUVsQjs7OztHQUlHO0FBQ0gsU0FBUyxlQUFlLENBQUMsSUFBeUI7SUFDOUMsSUFBSSxTQUFTLEdBQUcsY0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzQyxJQUFHLFNBQVMsS0FBSyxFQUFFLEVBQUM7UUFDaEIsU0FBUyxHQUFHLE1BQU0sQ0FBQTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQTtLQUM5QjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUErREcsMENBQWU7QUE3RG5COzs7Ozs7R0FNRztBQUNILFNBQVMsV0FBVyxDQUFDLEtBQXFCLEVBQUUsSUFBVSxFQUFFLElBQVU7SUFDOUQsS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLEVBQUU7UUFDcEQsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLFFBQVEsS0FBSyxFQUFFO29CQUNYLEtBQUssT0FBTzt3QkFDUixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzt3QkFDN0IsTUFBTTtvQkFDVixLQUFLLGFBQWE7d0JBQ2QsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLGVBQWUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDOUYsTUFBTTtvQkFDVixLQUFLLFFBQVE7d0JBQ1QsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3BDO2FBQ0o7aUJBQU07Z0JBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7cUJBQ3RCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztxQkFDNUIsT0FBTyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO3FCQUNwQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7cUJBQ3BDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztxQkFDbEMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7cUJBQ3RELE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO3FCQUN0RCxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFFN0QsTUFBTSxjQUFjLEdBQUcsNkJBQTZCLENBQUM7Z0JBQ3JELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRS9DLE9BQU8sS0FBSyxFQUFFO29CQUNWLElBQUk7d0JBQ0EsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7NEJBQy9FLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO3lCQUNyQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTs0QkFDeEMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7eUJBQ3JCLENBQUMsQ0FBQzt3QkFFSCxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQ3pELEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3FCQUM5QztvQkFBQyxPQUFPLEdBQUcsRUFBRTt3QkFDVixNQUFNO3FCQUNUO2lCQUNKO2FBQ0o7U0FDSjtLQUNKO0lBRUQsSUFBSSxLQUFLLENBQUMsV0FBVztRQUNqQixLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFFckUsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUlHLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsZSB9IGZyb20gJy4uL21vZGVscy9GaWxlTW9kZWwnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL1VzZXJNb2RlbCc7XHJcbmltcG9ydCB7IEVtYmVkSW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0VtYmVkSW50ZXJmYWNlJztcclxuaW1wb3J0IHsgZXh0bmFtZSB9IGZyb20gJ3BhdGgnO1xyXG5cclxuLyoqXHJcbiAqIEZvcm1hdCBhIGZpbGUgc2l6ZSB0byBhIGh1bWFuIHJlYWRhYmxlIGZvcm1hdC5cclxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIGZpbGVzaXplIGluIGJ5dGVzLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgZmlsZXNpemUuXHJcbiAqL1xyXG5mdW5jdGlvbiBmb3JtYXRGaWxlc2l6ZShzaXplOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgaWYgKHNpemUgPT09IDApXHJcbiAgICAgICAgcmV0dXJuICcwIEInO1xyXG5cclxuICAgIGNvbnN0IHNpemVzID0gWydCJywgJ0tCJywgJ01CJywgJ0dCJ107XHJcbiAgICBjb25zdCBpbnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5sb2coMTAyNCkpO1xyXG5cclxuICAgIHJldHVybiBgJHsoc2l6ZSAvIE1hdGgucG93KDEwMjQsIGludCkpLnRvRml4ZWQoMil9ICR7c2l6ZXNbaW50XX1gO1xyXG59XHJcblxyXG4vKipcclxuICogRm9ybWF0IGEgZmlsZSBzaXplIHRvIGEgaHVtYW4gcmVhZGFibGUgZm9ybWF0LlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWUgVGhlIG9yaWdpbmFsIGZpbGVuYW1lLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgZmlsZXNpemUuXHJcbiAqL1xyXG5mdW5jdGlvbiBmb3JtYXRFeHRlbnNpb24oZmlsZTogRXhwcmVzcy5NdWx0ZXIuRmlsZSk6IHN0cmluZyB7XHJcbiAgICBsZXQgZXh0ZW5zaW9uID0gZXh0bmFtZShmaWxlLm9yaWdpbmFsbmFtZSk7XHJcbiAgICBpZihleHRlbnNpb24gPT09IFwiXCIpe1xyXG4gICAgICAgIGV4dGVuc2lvbiA9IFwiLnBuZ1wiXHJcbiAgICAgICAgZmlsZS5taW1ldHlwZSA9IFwiaW1hZ2UvcG5nXCJcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZXh0ZW5zaW9uO1xyXG59XHJcblxyXG4vKipcclxuICogRm9ybWF0IGEgZW1iZWQgdG8gZmlsbCBvdXQgdGhlIHRlbXBsYXRlcy5cclxuICogQHBhcmFtIHtFbWJlZEludGVyZmFjZX0gZW1iZWQgVGhlIGVtYmVkIHNldHRpbmdzLlxyXG4gKiBAcGFyYW0ge1VzZXJ9IHVzZXIgVGhlIHVzZXIgd2hvIHNldCB0aGUgZW1iZWQgc2V0dGluZ3MuXHJcbiAqIEBwYXJhbSB7RmlsZX0gZmlsZSBUaGUgZmlsZSwgaWYgbmVlZGVkLlxyXG4gKiBAcmV0dXJuIHtFbWJlZEludGVyZmFjZX0gVGhlIGZvcm1hdHRlZCBlbWJlZC5cclxuICovXHJcbmZ1bmN0aW9uIGZvcm1hdEVtYmVkKGVtYmVkOiBFbWJlZEludGVyZmFjZSwgdXNlcjogVXNlciwgZmlsZTogRmlsZSk6IEVtYmVkSW50ZXJmYWNlIHtcclxuICAgIGZvciAoY29uc3QgZmllbGQgb2YgWyd0aXRsZScsICdkZXNjcmlwdGlvbicsICdhdXRob3InXSkge1xyXG4gICAgICAgIGlmIChlbWJlZFtmaWVsZF0pIHtcclxuICAgICAgICAgICAgaWYgKGVtYmVkW2ZpZWxkXSA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndGl0bGUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWJlZFtmaWVsZF0gPSBmaWxlLmZpbGVuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkZXNjcmlwdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYmVkW2ZpZWxkXSA9IGBVcGxvYWRlZCBhdCAke25ldyBEYXRlKGZpbGUudGltZXN0YW1wKS50b0xvY2FsZVN0cmluZygpfSBieSAke3VzZXIudXNlcm5hbWV9YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYXV0aG9yJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWRbZmllbGRdID0gdXNlci51c2VybmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVtYmVkW2ZpZWxkXSA9IGVtYmVkW2ZpZWxkXVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7c2l6ZX0nLCBmaWxlLnNpemUpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t1c2VybmFtZX0nLCB1c2VyLnVzZXJuYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7ZmlsZW5hbWV9JywgZmlsZS5maWxlbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3VwbG9hZHN9JywgdXNlci51cGxvYWRzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCd7ZGF0ZX0nLCBmaWxlLnRpbWVzdGFtcC50b0xvY2FsZURhdGVTdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgne3RpbWV9JywgZmlsZS50aW1lc3RhbXAudG9Mb2NhbGVUaW1lU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJ3t0aW1lc3RhbXB9JywgZmlsZS50aW1lc3RhbXAudG9Mb2NhbGVTdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgVElNRVpPTkVfUkVHRVggPSAveyh0aW1lfHRpbWVzdGFtcCk6KFtefV0rKX0vaTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IGVtYmVkW2ZpZWxkXS5tYXRjaChUSU1FWk9ORV9SRUdFWCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkID0gbWF0Y2hbMV0gPT09ICd0aW1lJyA/IGZpbGUudGltZXN0YW1wLnRvTG9jYWxlVGltZVN0cmluZygnZW4tVVMnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lWm9uZTogbWF0Y2hbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIDogZmlsZS50aW1lc3RhbXAudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVpvbmU6IG1hdGNoWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYmVkW2ZpZWxkXSA9IGVtYmVkW2ZpZWxkXS5yZXBsYWNlKG1hdGNoWzBdLCBmb3JtYXR0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IGVtYmVkW2ZpZWxkXS5tYXRjaChUSU1FWk9ORV9SRUdFWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW1iZWQucmFuZG9tQ29sb3IpXHJcbiAgICAgICAgZW1iZWQuY29sb3IgPSBgIyR7KCgxIDw8IDI0KSAqIE1hdGgucmFuZG9tKCkgfCAwKS50b1N0cmluZygxNil9YDtcclxuXHJcbiAgICByZXR1cm4gZW1iZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBmb3JtYXRGaWxlc2l6ZSxcclxuICAgIGZvcm1hdEVtYmVkLFxyXG4gICAgZm9ybWF0RXh0ZW5zaW9uXHJcbn07XHJcbiJdfQ==