# Wall of Fame Configuration

This directory contains the YAML configuration for the Wall of Fame section on the homepage.

## How to Edit

Simply edit the `wall-of-fame.yaml` file to add, remove, or modify community members.

### File Structure

```yaml
members:
  - Username
  - Another User
  - Third User
```

### Format

Simply list member names, one per line with a dash. Colors alternate automatically:
- First member: primary color
- Second member: secondary color
- Third member: primary color
- And so on...

### Example

```yaml
members:
  - Carrot
  - "@NewMember"
  - CoolPlayer
```

## How It Works

When you run `npm run build`, Astro will:
1. Read the YAML file
2. Parse the member list
3. Generate HTML cards with automatically alternating colors
4. Apply random rotations for visual variety
5. Create the ticker animation with all members

The cards will automatically alternate between primary and secondary colors, and each card gets a slight rotation for that neobrutalist aesthetic.

## Tips

- Members appear in the order they're listed in the YAML file
- The ticker animation duplicates the list to create a seamless loop
- You can add as many members as you want
- Names with special characters (like @) work fine - just wrap them in quotes if needed
- Colors are assigned automatically based on position (no need to specify)
