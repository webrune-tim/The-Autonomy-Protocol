ALTER TABLE `modules` ADD `category` text DEFAULT 'step' NOT NULL;--> statement-breakpoint
ALTER TABLE `user_progress` ADD `response` text;