Watchlist
=========

The data behind the Watchlist website. Inspired by samczsun's "[Plugin Blacklist]" website.

## Contributing

### Plugins
1. Fork the repository.
2. Create a `yml` file named after the author using the format below.
3. Commit your files
4. Submit a pull request, bitches love pull requests!

##### Format
```yml
name: <plugin name>
status: Active
link: http://spigotmc.org/link/to/plugin
violations:
- Contains copyrighted code from <source>
```

### Users
1. Fork the repository.
2. Create a `yml` file named after the author using the format below.
3. Commit your files
4. Submit a pull request, bitches love pull requests!

##### Format
```yml
id: <spigot forum ID>
username: <spigot username>
reasons:
- Why they're
- on the watchlist
```
You must provider at least their username and one reason.

**How can I find somebody's spigot ID?**
- Navigate to the spigot website and find the user's profile
- Copy the profile link (example: `www.spigotmc.org/members/charries96.17104/`)
- Copy the number at the end of the link (`17104`)

### Notes
- If an author goes by multiple aliases then use their most commonly known one, support for multiple names will be added later.
- Spaces in plugin names should be replaced with an underscore when creating the `yml` file.

[Plugin Blacklist]: http://samczsun.com/warning.html
