# Database Schema (PostgreSQL)

## `admin_users`
- `id` (UUID, Primary Key)
- `email` (String, Unique, Indexed)
- `hashed_password` (String)
- `name` (String, Default: "Admin")
- `created_at`, `updated_at` (DateTime)

## `projects`
- `id` (UUID, Primary Key)
- `title` (String)
- `slug` (String, Unique, Indexed)
- `description` (Text)
- `content` (Text)
- `image_url` (String)
- `github_url` (String, Nullable)
- `live_url` (String, Nullable)
- `tags` (JSONB)
- `is_published` (Boolean, Default: false)
- `created_at`, `updated_at` (DateTime)

## `contact_messages`
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Indexed)
- `message` (Text)
- `status` (Enum: 'new', 'read', 'replied')
- `created_at`, `updated_at` (DateTime)

## `site_settings`
- `id` (UUID, Primary Key)
- `hero_title` (String)
- `hero_subtitle` (String)
- `about_text` (Text)
- `resume_url` (String, Nullable)
- `social_links` (JSONB)
- `created_at`, `updated_at` (DateTime)

## `site_analytics`
- `id` (UUID, Primary Key)
- `path` (String, Indexed)
- `user_agent` (String)
- `ip_address_hash` (String, Indexed)
- `visited_at` (DateTime)

## `alembic_version`
- `version_num` (String, Primary Key) - Tracks migration state.
