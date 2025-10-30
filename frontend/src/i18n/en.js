export default {
    // Landing Page
    landing: {
        nav: {
            home: 'Home',
            features: 'Features',
            documentation: 'Documentation',
            login: 'Login',
            signup: 'Sign Up'
        },
        hero: {
            badge: 'New',
            badgeText: 'Real-time Analytics',
            title: 'Webhook Management',
            subtitle: 'Made Simple',
            description: 'Create, monitor, and manage webhooks with ease. Get instant insights into your webhook traffic and never miss an event.',
            getStarted: 'Get Started Free',
            viewDocs: 'View Documentation'
        },
        features: {
            title: 'Powerful Features',
            instant: {
                title: 'Instant Setup',
                description: 'Create webhook endpoints in seconds. No complex configuration required.'
            },
            monitoring: {
                title: 'Real-time Monitoring',
                description: 'Track every request with detailed logs and analytics in real-time.'
            },
            secure: {
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security with 99.9% uptime guarantee.'
            }
        },
        howItWorks: {
            title: 'How It Works',
            description: 'Get started with AstraHook in three simple steps',
            step1: {
                title: 'Create Webhook',
                description: 'Set up a new webhook endpoint with just a few clicks'
            },
            step2: {
                title: 'Integrate URL',
                description: 'Add the webhook URL to your application or service'
            },
            step3: {
                title: 'Monitor & Manage',
                description: 'Track and manage incoming requests in real-time'
            }
        },
        cta: {
            title: 'Ready to Get Started?',
            description: 'Join thousands of developers using AstraHook to manage their webhooks.',
            button: 'Create Free Account'
        },
        footer: {
            tagline: 'Modern webhook management platform for developers.',
            product: 'Product',
            features: 'Features',
            docs: 'Documentation',
            company: 'Company',
            about: 'About',
            contact: 'Contact',
            legal: 'Legal',
            privacy: 'Privacy',
            terms: 'Terms',
            rights: '2025 AstraHook. All rights reserved.'
        }
    },

    // Documentation
    docs: {
        title: 'Documentation',
        subtitle: 'Webhook Guide',
        description: 'Everything you need to master webhooks, file uploads, and API integration',
        search: 'Search documentation...',
        categories: 'Categories',
        pages: 'Pages',
        notFound: 'Page not found',
        loading: 'Loading...',
        backToHome: 'Back to Home',
        quickStart: {
            create: {
                title: 'Create Webhook',
                description: 'Generate your first webhook endpoint in seconds with our intuitive dashboard',
                link: 'Learn more'
            },
            send: {
                title: 'Send Data',
                description: 'Upload images, videos, and JSON data to your webhook endpoints',
                link: 'Learn more'
            },
            monitor: {
                title: 'Monitor & Analyze',
                description: 'View detailed logs, analytics, and debug your webhook integrations',
                link: 'Learn more'
            }
        },
        cta: {
            title: 'Ready to get started?',
            description: 'Join thousands of developers using AstraHook for their webhook needs',
            getStarted: 'Get Started Free',
            readDocs: 'Read Documentation'
        },
        getStartedMinutes: 'Get Started in Minutes',
        viewExamples: 'View Examples',
        startFreeTrial: 'Start Free Trial'
    },

    // Common
    common: {
        mySettings: 'My Settings',
        adminPanel: 'Admin Panel',
        dashboard: 'Dashboard',
        logout: 'Logout',
        success: 'successful!',
        viewSite: 'View Site'
    },

    // Sidebar Menu
    sidebar: {
        dashboards: 'Dashboards',
        default: 'Dashboard',
        apps: 'Apps',
        webhooks: 'Webhooks',
        mySettings: 'My Settings',
        documentation: 'Documentation'
    },

    // Admin Panel
    admin: {
        panel: 'Admin Panel',
        sidebar: {
            dashboard: 'Dashboard',
            users: 'Users',
            webhooks: 'Webhooks',
            documentation: 'Documentation',
            companyPages: 'Page Management',
            settings: 'Settings'
        },
        profile: {
            adminPanel: 'Admin Panel',
            dashboard: 'Dashboard',
            mySettings: 'My Settings',
            logout: 'Logout'
        },
        dashboard: {
            title: 'Admin Dashboard',
            subtitle: 'Overview of system statistics and management',
            stats: {
                totalUsers: 'Total Users',
                totalWebhooks: 'Total Webhooks',
                totalRequests: 'Total Requests',
                systemHealth: 'System Health',
                healthy: 'Healthy'
            },
            quickActions: {
                title: 'Quick Actions',
                manageUsers: 'Manage Users',
                manageUsersDesc: 'View and manage all users',
                manageWebhooks: 'Manage Webhooks',
                manageWebhooksDesc: 'View all webhooks',
                systemSettings: 'System Settings',
                systemSettingsDesc: 'Configure system'
            },
            recentActivity: 'Recent Activity',
            noRecentActivity: 'No recent activity',
            systemStatus: {
                title: 'System Status',
                apiServer: 'API Server',
                database: 'Database',
                webhookService: 'Webhook Service',
                serverUptime: 'Server Uptime',
                online: 'Online',
                connected: 'Connected',
                running: 'Running'
            },
            timeAgo: {
                justNow: 'Just now',
                minAgo: 'min ago',
                hourAgo: 'hour ago',
                dayAgo: 'day ago'
            }
        },
        users: {
            title: 'Users Management',
            subtitle: 'Manage all registered users',
            totalUsers: 'Total Users',
            loading: 'Loading users...',
            table: {
                user: 'User',
                email: 'Email',
                role: 'Role',
                webhooks: 'Webhooks',
                joined: 'Joined',
                actions: 'Actions'
            },
            delete: {
                title: 'Delete User',
                subtitle: 'This action cannot be undone',
                message: 'Are you sure you want to delete',
                warning: 'All webhooks and data associated with this user will be permanently deleted.',
                cancel: 'Cancel',
                confirm: 'Delete User',
                success: 'User deleted successfully!',
                failed: 'Failed to delete user'
            },
            loadFailed: 'Failed to load users'
        },
        webhooks: {
            title: 'Webhook Management',
            subtitle: 'Manage all webhooks across users',
            totalWebhooks: 'Total Webhooks',
            stats: {
                totalWebhooks: 'Total Webhooks',
                active: 'Active',
                totalRequests: 'Total Requests',
                successRate: 'Success Rate'
            },
            table: {
                webhook: 'Webhook',
                owner: 'Owner',
                url: 'URL',
                status: 'Status',
                requests: 'Requests',
                created: 'Created',
                actions: 'Actions'
            },
            status: {
                active: 'active',
                inactive: 'inactive'
            },
            deleteConfirm: 'Are you sure you want to delete',
            deleteSuccess: 'Webhook deleted successfully!',
            deleteFailed: 'Failed to delete webhook',
            loadFailed: 'Failed to load webhooks'
        },
        webhookDetails: {
            backToWebhooks: 'Back to Webhooks',
            loading: 'Loading webhook details...',
            webhookId: 'Webhook #',
            webhookUrl: 'Webhook URL',
            secretKey: 'Secret Key',
            stats: {
                totalRequests: 'Total Requests',
                successful: 'Successful',
                failed: 'Failed',
                successRate: 'Success Rate'
            },
            recentLogs: 'Recent Logs',
            clearAllLogs: 'Clear All Logs',
            clearing: 'Clearing...',
            noLogs: 'No logs yet for this webhook.',
            clearConfirm: 'Are you sure you want to clear all logs for this webhook? This action cannot be undone.',
            clearSuccess: 'All logs cleared successfully',
            clearFailed: 'Failed to clear logs',
            loadFailed: 'Failed to load webhook details',
            statsFailed: 'Failed to load statistics',
            logsFailed: 'Failed to load logs',
            copySuccess: 'Copied to clipboard!',
            copyFailed: 'Failed to copy'
        },
        docsEditor: {
            untitledDocument: 'Untitled Document',
            editing: 'Editing',
            creatingNewPage: 'Creating new page',
            preview: 'Preview',
            cancel: 'Cancel',
            update: 'Update',
            publish: 'Publish',
            pageSettings: 'Page Settings',
            title: 'Title',
            titlePlaceholder: 'Enter page title',
            slug: 'Slug',
            slugPlaceholder: 'page-slug',
            url: 'URL',
            category: 'Category',
            selectCategory: 'Select category',
            statistics: 'Statistics',
            characters: 'Characters',
            words: 'Words',
            lines: 'Lines',
            markdownGuide: 'Markdown Guide',
            markdownEditor: 'Markdown Editor',
            bold: 'Bold',
            italic: 'Italic',
            link: 'Link',
            code: 'Code',
            heading: 'Heading',
            heading2: 'Heading 2',
            editorPlaceholder: '# Start writing your documentation...\n\nWrite your content using **Markdown** syntax.\n\n## Features\n- Easy to use\n- Real-time preview\n- Syntax highlighting\n\n```javascript\nconsole.log(\'Hello World\')\n```',
            startWriting: 'Start writing to see preview...',
            loadCategoriesFailed: 'Failed to load categories',
            loadPageFailed: 'Failed to load page',
            pageUpdated: 'Page updated successfully!',
            pageCreated: 'Page created successfully!',
            savePageFailed: 'Failed to save page'
        },
        docsManagement: {
            title: 'Documentation Management',
            subtitle: 'Manage documentation categories and pages',
            addCategory: 'Add Category',
            addPage: 'Add Page',
            categories: 'Categories',
            pages: 'Pages',
            noCategoriesYet: 'No categories yet',
            noPagesYet: 'No pages yet',
            edit: 'Edit',
            delete: 'Delete',
            editCategory: 'Edit Category',
            categoryTitle: 'Title',
            categoryTitlePlaceholder: 'Category title',
            slug: 'Slug',
            slugPlaceholder: 'category-slug',
            parentCategory: 'Parent Category (Optional)',
            noneTopLevel: 'None (Top Level)',
            cancel: 'Cancel',
            update: 'Update',
            create: 'Create',
            deleteCategoryTitle: 'Delete Category',
            deleteCategoryMessage: 'Are you sure you want to delete',
            deleteCategoryWarning: 'This will also delete all pages in this category. This action cannot be undone.',
            deletePageTitle: 'Delete Page',
            deletePageMessage: 'Are you sure you want to delete',
            deletePageWarning: 'This action cannot be undone.',
            unknown: 'Unknown',
            loadCategoriesFailed: 'Failed to load categories',
            loadPagesFailed: 'Failed to load pages',
            categoryUpdated: 'Category updated successfully!',
            categoryCreated: 'Category created successfully!',
            saveCategoryFailed: 'Failed to save category',
            categoryDeleted: 'Category and associated pages deleted successfully!',
            deleteCategoryFailed: 'Failed to delete category',
            reorderCategoriesFailed: 'Failed to reorder categories',
            pageDeleted: 'Page deleted successfully!',
            deletePageFailed: 'Failed to delete page',
            reorderPagesFailed: 'Failed to reorder pages'
        },
        companyPages: {
            title: 'Page Management',
            subtitle: 'Manage pages',
            createPage: 'Create Page',
            totalPages: 'Total Pages',
            loading: 'Loading pages...',
            table: {
                title: 'Title',
                slug: 'Slug',
                status: 'Status',
                updated: 'Updated',
                actions: 'Actions'
            },
            status: {
                published: 'Published',
                draft: 'Draft'
            },
            delete: {
                confirm: 'Are you sure you want to delete this page?',
                success: 'Page deleted successfully!',
                failed: 'Failed to delete page'
            },
            loadFailed: 'Failed to load pages',
            empty: {
                title: 'No pages yet',
                description: 'Create your first company page',
                button: 'Create Page'
            }
        },
        companyPageForm: {
            createTitle: 'Create New Page',
            editTitle: 'Edit Page',
            backToPages: 'Back to Pages',
            title: 'Title',
            titlePlaceholder: 'Enter page title',
            slug: 'Slug',
            slugPlaceholder: 'page-slug',
            content: 'Content',
            contentPlaceholder: 'Enter page content (Markdown supported)',
            status: 'Status',
            published: 'Published',
            draft: 'Draft',
            metaTitle: 'Meta Title',
            metaTitlePlaceholder: 'Meta title for SEO',
            metaDescription: 'Meta Description',
            metaDescriptionPlaceholder: 'Meta description for SEO',
            cancel: 'Cancel',
            save: 'Save',
            saving: 'Saving...',
            creating: 'Creating...',
            createSuccess: 'Page created successfully!',
            updateSuccess: 'Page updated successfully!',
            createFailed: 'Failed to create page',
            updateFailed: 'Failed to update page',
            loadFailed: 'Failed to load page',
            validation: {
                titleRequired: 'Title is required',
                slugRequired: 'Slug is required',
                contentRequired: 'Content is required'
            }
        },
        siteSettings: {
            title: 'Site Settings',
            subtitle: 'Configure general site settings',
            save: 'Save Settings',
            saving: 'Saving...',
            saveSuccess: 'Settings saved successfully!',
            saveFailed: 'Failed to save settings',
            loadFailed: 'Failed to load settings',
            tabs: {
                general: 'General',
                landing: 'Landing Page',
                branding: 'Branding',
                seo: 'SEO & Social'
            },
            general: {
                infoText: 'These settings control the basic information and behavior of your site.',
                siteTitle: 'Site Title',
                siteTitlePlaceholder: 'Enter site title',
                siteTitleHelp: 'Displayed in browser tab and header',
                siteDescription: 'Site Description',
                siteDescriptionPlaceholder: 'Enter site description',
                siteDescriptionHelp: 'Brief description of your site',
                footerText: 'Footer Text',
                footerTextPlaceholder: '© 2025 Your Company',
                enableRegistration: 'Enable User Registration',
                maintenanceMode: 'Maintenance Mode',
                siteName: 'Site Name',
                siteNamePlaceholder: 'Enter your site name',
                contactEmail: 'Contact Email',
                contactEmailPlaceholder: 'contact@example.com',
                supportEmail: 'Support Email',
                supportEmailPlaceholder: 'support@example.com'
            },
            landing: {
                heroTitle: 'Hero Title',
                heroTitlePlaceholder: 'Welcome to AstraHook',
                heroSubtitle: 'Hero Subtitle',
                heroSubtitlePlaceholder: 'Powerful webhook management made simple',
                heroCtaText: 'Call-to-Action Button Text',
                heroCtaTextPlaceholder: 'Get Started'
            },
            branding: {
                siteLogo: 'Site Logo',
                chooseLogo: 'Choose Logo',
                logoHelp: 'Recommended: PNG or SVG, max 2MB',
                siteLogoLight: 'Site Logo (Light Theme)',
                chooseLogoLight: 'Choose Light Logo',
                logoLightHelp: 'Logo for light theme. Recommended: PNG or SVG, max 2MB',
                siteLogoDark: 'Site Logo (Dark Theme)',
                chooseLogoDark: 'Choose Dark Logo',
                logoDarkHelp: 'Logo for dark theme. Recommended: PNG or SVG, max 2MB',
                favicon: 'Favicon',
                chooseFavicon: 'Choose Favicon',
                faviconHelp: 'Recommended: ICO or PNG, 32x32px or 64x64px'
            },
            seo: {
                basicMetaTags: 'Basic Meta Tags',
                metaDescription: 'Meta Description',
                metaDescriptionPlaceholder: 'Brief description for search engines (max 160 characters)',
                characters: 'characters',
                metaKeywords: 'Meta Keywords',
                metaKeywordsPlaceholder: 'webhook, api, integration, automation',
                metaKeywordsHelp: 'Comma-separated keywords',
                metaAuthor: 'Meta Author',
                metaAuthorPlaceholder: 'Your Company Name',
                canonicalUrl: 'Canonical URL',
                canonicalUrlPlaceholder: 'https://yourdomain.com',
                canonicalUrlHelp: 'Preferred URL for search engines',
                robotsMetaTag: 'Robots Meta Tag',
                robotsIndexFollow: 'Index, Follow (Default)',
                robotsNoIndexFollow: 'No Index, Follow',
                robotsIndexNoFollow: 'Index, No Follow',
                robotsNoIndexNoFollow: 'No Index, No Follow',
                robotsHelp: 'Control how search engines crawl your site',
                openGraph: 'Open Graph (Facebook, LinkedIn)',
                ogTitle: 'OG Title',
                ogTitlePlaceholder: 'Your Site Title for Social Media',
                ogDescription: 'OG Description',
                ogDescriptionPlaceholder: 'Description shown when shared on social media',
                ogImage: 'OG Image',
                chooseImage: 'Choose Image',
                ogImageHelp: 'Recommended: 1200x630px, max 5MB',
                ogType: 'OG Type',
                ogTypeWebsite: 'Website',
                ogTypeArticle: 'Article',
                ogTypeProduct: 'Product',
                ogTypeProfile: 'Profile',
                twitterCard: 'Twitter Card',
                twitterCardType: 'Twitter Card Type',
                twitterCardSummary: 'Summary',
                twitterCardLargeImage: 'Summary Large Image',
                twitterCardApp: 'App',
                twitterCardPlayer: 'Player',
                twitterSite: 'Twitter Site Handle',
                twitterSitePlaceholder: '@yourusername',
                twitterSiteHelp: "Your site's Twitter username",
                twitterCreator: 'Twitter Creator Handle',
                twitterCreatorPlaceholder: '@creatorusername',
                twitterCreatorHelp: "Content creator's Twitter username"
            },
            social: {
                title: 'Social Media',
                github: 'GitHub URL',
                githubPlaceholder: 'https://github.com/username',
                twitter: 'Twitter URL',
                twitterPlaceholder: 'https://twitter.com/username',
                linkedin: 'LinkedIn URL',
                linkedinPlaceholder: 'https://linkedin.com/company/name'
            },
            features: {
                title: 'Features',
                enableRegistration: 'Enable Registration',
                enableRegistrationDesc: 'Allow new users to register',
                maintenanceMode: 'Maintenance Mode',
                maintenanceModeDesc: 'Put site in maintenance mode'
            }
        }
    },

    // User Dashboard
    dashboard: {
        title: 'Dashboard',
        welcome: 'Welcome back! Here\'s your webhook overview.',
        stats: {
            totalWebhooks: 'Total Webhooks',
            active: 'Active',
            totalRequests: 'Total Requests',
            successRate: 'Success Rate'
        },
        quickActions: {
            title: 'Quick Actions',
            viewWebhooks: 'View Webhooks',
            manageWebhooks: 'Manage your webhooks',
            documentation: 'Documentation',
            learnHowToUse: 'Learn how to use',
            settings: 'Settings',
            configureAccount: 'Configure account'
        },
        loading: 'Loading...',
        loadingStats: 'Loading statistics...'
    },

    // Webhooks Page
    webhooks: {
        title: 'My Webhooks',
        createWebhook: 'Create Webhook',
        webhookUrl: 'Webhook URL',
        secretKey: 'Secret Key',
        created: 'Created',
        viewLogs: 'View Logs',
        viewJson: 'View JSON',
        copyToClipboard: 'Copied to clipboard!',
        copyFailed: 'Failed to copy',
        hideSecret: 'Hide secret',
        showSecret: 'Show secret',
        copySecret: 'Copy secret',
        loading: 'Loading webhooks...',
        empty: {
            title: 'No webhooks yet',
            description: 'Create your first webhook to get started',
            button: 'Create Webhook'
        },
        delete: {
            title: 'Delete Webhook',
            subtitle: 'This action cannot be undone',
            message: 'Are you sure you want to delete Webhook #ID?',
            warning: 'All logs and data associated with this webhook will be permanently deleted.',
            cancel: 'Cancel',
            confirm: 'Delete Webhook',
            success: 'Webhook deleted successfully!',
            failed: 'Failed to delete webhook'
        },
        json: {
            title: 'Webhook JSON Logs',
            totalLogs: 'Total Logs',
            currentPage: 'Current Page',
            totalPages: 'Total Pages',
            jsonResponse: 'JSON Response',
            copyFullJson: 'Copy Full JSON',
            refresh: 'Refresh',
            close: 'Close',
            copied: 'JSON copied to clipboard!',
            refreshed: 'JSON refreshed!',
            loadFailed: 'Failed to load logs',
            refreshFailed: 'Failed to refresh JSON'
        },
        createSuccess: 'Webhook created successfully!',
        createFailed: 'Failed to create webhook',
        loadFailed: 'Failed to load webhooks'
    },

    // Webhook Details Page
    webhookDetails: {
        backToWebhooks: 'Back to Webhooks',
        webhookId: 'Webhook #',
        webhookUrl: 'Webhook URL',
        secretKey: 'Secret Key',
        hideSecret: 'Hide secret',
        showSecret: 'Show secret',
        copySecret: 'Copy secret',
        stats: {
            totalRequests: 'Total Requests',
            successful: 'Successful',
            failed: 'Failed',
            successRate: 'Success Rate'
        },
        recentLogs: 'Recent Logs',
        noLogs: 'No logs yet. Send a request to this webhook to see logs here.',
        loadFailed: 'Failed to load webhook details',
        statsFailed: 'Failed to load statistics',
        logsFailed: 'Failed to load logs',
        copySuccess: 'Copied to clipboard!',
        copyFailed: 'Failed to copy'
    },

    // Settings Page
    settings: {
        title: 'Settings',
        profile: {
            title: 'Account Information',
            username: 'Username',
            usernamePlaceholder: 'Enter your username',
            email: 'Email',
            emailPlaceholder: 'Enter your email',
            role: 'Role',
            avatar: 'Avatar',
            currentAvatar: 'Current avatar',
            chooseFile: 'Choose File',
            upload: 'Upload',
            uploading: 'Uploading...',
            maxSize: 'Max 5MB. Supported: JPEG, PNG, GIF, WebP',
            updateButton: 'Update Profile',
            updating: 'Updating...',
            cannotChange: 'Avatar cannot be changed',
            noAvatar: 'No avatar set',
            fileSizeError: 'File size must be less than 5MB',
            fileTypeError: 'Only JPEG, PNG, GIF, and WebP images are allowed',
            selectFileFirst: 'Please select a file first',
            uploadSuccess: 'Avatar uploaded successfully!',
            uploadFailed: 'Failed to upload avatar',
            updateSuccess: 'Profile updated successfully!',
            updateFailed: 'Failed to update profile',
            atLeastOneField: 'At least one field is required',
            emailInvalid: 'Please enter a valid email address',
            usernameTooShort: 'Username must be at least 3 characters'
        },
        password: {
            title: 'Change Password',
            currentPassword: 'Current Password',
            currentPasswordPlaceholder: 'Enter current password',
            newPassword: 'New Password',
            newPasswordPlaceholder: 'Enter new password (min 6 characters)',
            confirmPassword: 'Confirm New Password',
            confirmPasswordPlaceholder: 'Confirm new password',
            changeButton: 'Change Password',
            changing: 'Changing...',
            fillAllFields: 'Please fill in all fields',
            passwordsNotMatch: 'New passwords do not match',
            passwordTooShort: 'New password must be at least 6 characters',
            passwordSameAsCurrent: 'New password must be different from current password',
            changeSuccess: 'Password changed successfully!',
            changeFailed: 'Failed to change password'
        }
    },

    // Auth Pages
    auth: {
        login: {
            title: 'Welcome Back',
            subtitle: 'Sign in to your account to continue',
            backToHome: 'Back to Home',
            email: 'Email Address',
            emailPlaceholder: 'Enter your email',
            password: 'Password',
            passwordPlaceholder: 'Enter your password',
            rememberMe: 'Remember me',
            forgotPassword: 'Forgot password?',
            loginButton: 'Sign In',
            loggingIn: 'Signing in...',
            noAccount: "Don't have an account?",
            signUp: 'Sign up',
            orContinueWith: 'Or continue with',
            google: 'Google',
            github: 'GitHub'
        },
        register: {
            title: 'Create Account',
            subtitle: 'Start your journey with AstraHook',
            backToLogin: 'Back to Login',
            username: 'Username',
            usernamePlaceholder: 'Choose a username',
            email: 'Email Address',
            emailPlaceholder: 'Enter your email',
            password: 'Password',
            passwordPlaceholder: 'Create a password',
            confirmPassword: 'Confirm Password',
            confirmPasswordPlaceholder: 'Confirm your password',
            agreeToTerms: 'I agree to the',
            termsOfService: 'Terms of Service',
            and: 'and',
            privacyPolicy: 'Privacy Policy',
            registerButton: 'Create Account',
            registering: 'Creating account...',
            haveAccount: 'Already have an account?',
            signIn: 'Sign in',
            orContinueWith: 'Or continue with',
            google: 'Google',
            github: 'GitHub'
        },
        errors: {
            emailRequired: 'Email is required',
            emailInvalid: 'Please enter a valid email',
            passwordRequired: 'Password is required',
            passwordTooShort: 'Password must be at least 6 characters',
            passwordsNotMatch: 'Passwords do not match',
            usernameRequired: 'Username is required',
            usernameTooShort: 'Username must be at least 3 characters',
            termsRequired: 'You must agree to the terms and conditions',
            loginFailed: 'Invalid email or password',
            registerFailed: 'Registration failed. Please try again.'
        }
    }
}
