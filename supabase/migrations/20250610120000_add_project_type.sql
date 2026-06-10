ALTER TABLE projects
ADD COLUMN IF NOT EXISTS project_type text NOT NULL DEFAULT 'personal'
CHECK (project_type IN ('personal', 'team'));
