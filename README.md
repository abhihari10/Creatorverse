# Creatorverse

Submitted by: Abhi Hari

Creatorverse is a React and Supabase app for collecting favorite content creators. Users can browse creator cards, view profile pages, visit each creator's channel, add new creators, edit existing creators, and delete creators from the directory.

Time spent: Built with Codex support.

## Required Features

The following required functionality is completed:

- [x] A logical component structure in React
- [x] At least five content creators displayed on the homepage
- [x] Each creator item includes a name, channel link, and short description
- [x] API calls use async/await through the Supabase JavaScript client
- [x] Clicking a creator opens a details page
- [x] Each creator has a unique URL
- [x] Users can edit a creator's name, URL, description, and image URL
- [x] Users can delete a creator
- [x] Users can add a creator with name, URL, description, and optional image URL
- [x] Newly added creators appear in the displayed list

The following stretch functionality is completed:

- [x] Creator items display as cards
- [x] Creator cards show images
- [x] The app has custom responsive styling

## Video Walkthrough

Add your walkthrough GIF or video link here before final CodePath submission.

## Notes

The app expects a Supabase table named `creators`. The setup SQL is included in [supabase-setup.sql](./supabase-setup.sql). It creates the table, enables RLS, adds public CRUD policies for this prework app, grants Data API access, and seeds five creators when the table is empty.

## Local Development

Create a `.env` file with:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Then run:

```bash
npm install
npm run dev
```

## License

Copyright 2026 Abhi Hari
