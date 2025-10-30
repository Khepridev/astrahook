<template>
    <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <!-- Documentation Header -->
        <div
            class="border-b border-neutral-200 dark:border-neutral-800/50 bg-white/90 dark:bg-neutral-950/80 sticky top-0 z-50 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <div class="flex items-center gap-3 sm:gap-6">
                    <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Zap class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 dark:text-neutral-400" />
                        <span
                            class="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-50">AstraHook</span>
                    </router-link>
                    <div class="hidden sm:block h-6 w-px bg-neutral-300 dark:bg-neutral-700"></div>
                    <div class="hidden sm:flex items-center gap-3">
                        <div
                            class="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                            <BookOpen class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                        </div>
                        <div>
                            <h1 class="text-base font-semibold text-neutral-900 dark:text-neutral-50">Documentation</h1>
                            <p class="text-xs text-neutral-600 dark:text-neutral-400">Webhook Guide</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button @click="mobileMenuOpen = !mobileMenuOpen"
                        class="lg:hidden px-3 py-1.5 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 transition-all">
                        <Menu class="w-4 h-4" />
                    </button>
                    <button @click="toggleTheme"
                        class="px-3 py-1.5 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 transition-all">
                        <Sun v-if="isDark" class="w-4 h-4" />
                        <Moon v-else class="w-4 h-4" />
                    </button>

                    <!-- Language Dropdown -->
                    <div class="relative language-dropdown hidden sm:block">
                        <button @click="langMenuOpen = !langMenuOpen"
                            class="inline-flex shrink-0 justify-center items-center gap-x-1 px-3 py-1.5 text-xs font-medium rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all">
                            <span class="text-xs">{{ currentLocale === 'tr' ? 'Türkçe' : 'English' }}</span>
                            <svg class="shrink-0 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div v-if="langMenuOpen"
                            class="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg py-1 z-50">
                            <button @click="changeLanguage('tr')"
                                :class="currentLocale === 'tr' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
                                class="w-full text-left px-3 py-2 text-xs text-neutral-700 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                                🇹🇷 Türkçe
                            </button>
                            <button @click="changeLanguage('en')"
                                :class="currentLocale === 'en' ? 'bg-neutral-50 dark:bg-neutral-700' : ''"
                                class="w-full text-left px-3 py-2 text-xs text-neutral-500 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                                🇺🇸 English
                            </button>
                        </div>
                    </div>

                    <!-- User Profile Dropdown (Local) -->
                    <div v-if="authStore.isAuthenticated()" class="relative user-dropdown hidden sm:block">
                        <button @click="userMenuOpen = !userMenuOpen"
                            class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all">
                            <UserAvatar :avatar-url="authStore.user?.avatar_url" 
                                :username="authStore.user?.username || authStore.user?.email"
                                size="sm" />
                            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                {{ authStore.user?.username || authStore.user?.email?.split('@')[0] }}
                            </span>
                            <ChevronDown class="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
                        </button>

                        <!-- Dropdown Menu -->
                        <div v-if="userMenuOpen"
                            class="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg py-1 z-50">
                            <!-- Admin Panel (if admin) -->
                            <router-link v-if="authStore.user?.role === 'admin'" to="/admin/dashboard"
                                @click="userMenuOpen = false"
                                class="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>{{ t('common.adminPanel') }}</span>
                            </router-link>

                            <!-- Dashboard -->
                            <router-link to="/dashboard" @click="userMenuOpen = false"
                                class="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                </svg>
                                <span>{{ t('common.dashboard') }}</span>
                            </router-link>

                            <!-- My Settings -->
                            <router-link to="/my-settings" @click="userMenuOpen = false"
                                class="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{{ t('common.mySettings') }}</span>
                            </router-link>

                            <hr class="my-1 border-neutral-200 dark:border-neutral-700" />

                            <!-- Logout -->
                            <button @click="handleLogout"
                                class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>{{ t('common.logout') }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <transition name="mobile-nav">
            <div v-if="mobileMenuOpen" class="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                @click="mobileMenuOpen = false">
                <div class="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800/50 overflow-y-auto"
                    @click.stop>
                    <div
                        class="p-4 border-b border-neutral-200 dark:border-neutral-800/50 flex items-center justify-between">
                        <h2 class="font-semibold text-neutral-900 dark:text-neutral-50">Navigation</h2>
                        <button @click="mobileMenuOpen = false"
                            class="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50">
                            <X class="w-4 h-4" />
                        </button>
                    </div>
                    <nav class="p-4 space-y-4">
                        <div v-for="category in categories" :key="category.id">
                            <h3
                                class="px-3 py-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                {{ category.title }}
                            </h3>
                            <div class="space-y-1 mt-2">
                                <a v-for="page in pagesByCategory[category.id]" :key="page.id" :href="`#${page.slug}`"
                                    @click.prevent="scrollToSection(page.slug); mobileMenuOpen = false"
                                    class="block px-3 py-2 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all"
                                    :class="activeSection === page.slug ? 'bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-50 font-medium' : 'text-neutral-600 dark:text-neutral-400'">
                                    {{ page.title }}
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </transition>

        <div class="max-w-7xl mx-auto flex">
            <!-- Sidebar Navigation -->
            <aside
                class="hidden lg:block w-64 border-r border-neutral-200 dark:border-neutral-800/50 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
                <nav class="p-4 space-y-4">
                    <div v-for="category in categories" :key="category.id">
                        <h3
                            class="px-3 py-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            {{ category.title }}
                        </h3>
                        <div class="space-y-1 mt-2">
                            <a v-for="page in pagesByCategory[category.id]" :key="page.id" :href="`#${page.slug}`"
                                @click.prevent="scrollToSection(page.slug)"
                                class="block px-3 py-2 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all"
                                :class="activeSection === page.slug ? 'bg-neutral-100 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-50 font-medium' : 'text-neutral-600 dark:text-neutral-400'">
                                {{ page.title }}
                            </a>
                        </div>
                    </div>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 px-4 sm:px-6 py-6 sm:py-8">
                <div v-if="loading" class="flex items-center justify-center py-12">
                    <div class="text-neutral-500 dark:text-neutral-400">Loading documentation...</div>
                </div>

                <div v-else class="space-y-12">
                    <!-- Dynamic Pages -->
                    <section v-for="page in pages" :key="page.id" :id="page.slug" class="scroll-mt-20">
                        <div class="markdown-content" v-html="renderMarkdown(page.content)"></div>
                    </section>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { BookOpen, Sun, Moon, Zap, Menu, X, ChevronDown } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '@/stores/auth'
import { useLocaleStore } from '@/stores/locale'
import UserAvatar from '@/components/common/UserAvatar.vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import api from '@/utils/api'

const authStore = useAuthStore()
const localeStore = useLocaleStore()
const t = localeStore.t

const { isDark, toggleTheme } = useTheme()
const activeSection = ref('')
const mobileMenuOpen = ref(false)
const langMenuOpen = ref(false)
const userMenuOpen = ref(false)
const categories = ref([])
const pages = ref([])
const loading = ref(true)

// Language management
const currentLocale = computed(() => localeStore.currentLocale)

const changeLanguage = (lang) => {
    localeStore.setLocale(lang)
    langMenuOpen.value = false
}

// Initialize markdown-it with highlight.js
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                const highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
                return '<div class="code-block-wrapper"><button class="copy-button" onclick="window.copyCodeBlock(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button><pre class="hljs"><code>' +
                    highlighted +
                    '</code></pre></div>'
            } catch (__) { }
        }
        const escaped = md.utils.escapeHtml(str)
        return '<div class="code-block-wrapper"><button class="copy-button" onclick="window.copyCodeBlock(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></button><pre class="hljs"><code>' + escaped + '</code></pre></div>'
    }
})

// Fetch categories and pages
const fetchDocs = async () => {
    try {
        loading.value = true
        const [categoriesRes, pagesRes] = await Promise.all([
            api.get('/api/docs/categories'),
            api.get('/api/docs/pages')
        ])

        categories.value = categoriesRes.data.categories.filter(c => c.is_published)
        pages.value = pagesRes.data.pages.filter(p => p.is_published)

        // Set first page as active
        if (pages.value.length > 0) {
            activeSection.value = pages.value[0].slug
        }
    } catch (error) {
        console.error('Failed to fetch docs:', error)
    } finally {
        loading.value = false
    }
}

// Group pages by category
const pagesByCategory = computed(() => {
    const grouped = {}
    categories.value.forEach(cat => {
        grouped[cat.id] = pages.value.filter(p => p.category_id === cat.id)
    })
    return grouped
})

// Render markdown content
const renderMarkdown = (content) => {
    return md.render(content)
}

const scrollToSection = (slug) => {
    const element = document.getElementById(slug)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        activeSection.value = slug
    }
}

const handleScroll = () => {
    const scrollPosition = window.scrollY + 100

    for (const page of pages.value) {
        const element = document.getElementById(page.slug)
        if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                activeSection.value = page.slug
                break
            }
        }
    }
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
    if (langMenuOpen.value && !event.target.closest('.language-dropdown')) {
        langMenuOpen.value = false
    }
    if (userMenuOpen.value && !event.target.closest('.user-dropdown')) {
        userMenuOpen.value = false
    }
}

// Handle logout
const handleLogout = () => {
    authStore.logout()
    userMenuOpen.value = false
    window.location.href = '/'
}

// Copy code function (global for onclick)
window.copyCodeBlock = function (button) {
    const wrapper = button.parentElement
    const code = wrapper.querySelector('code')

    navigator.clipboard.writeText(code.textContent).then(() => {
        // Change to check icon
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
        button.classList.add('copied')

        // Revert after 2 seconds
        setTimeout(() => {
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>'
            button.classList.remove('copied')
        }, 2000)
    })
}

onMounted(async () => {
    await fetchDocs()
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('click', handleClickOutside)
})


</script>

<style scoped>
/* Markdown Content Styles */
.markdown-content :deep(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #171717;
}

.dark .markdown-content :deep(h1) {
    color: #fafafa;
}

.markdown-content :deep(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #262626;
}

.dark .markdown-content :deep(h2) {
    color: #e5e5e5;
}

.markdown-content :deep(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: #404040;
}

.dark .markdown-content :deep(h3) {
    color: #d4d4d4;
}

.markdown-content :deep(p) {
    margin-bottom: 1rem;
    color: #525252;
    line-height: 1.75;
}

.dark .markdown-content :deep(p) {
    color: #a3a3a3;
}

.markdown-content :deep(pre.hljs) {
    background-color: #0d1117;
    padding: 1.25rem;
    border-radius: 0.75rem;
    overflow-x: auto;
    margin-bottom: 1rem;
    border: 1px solid #30363d;
}

.dark .markdown-content :deep(pre.hljs) {
    background-color: #0d1117;
    border-color: #30363d;
}

.markdown-content :deep(pre.hljs code) {
    background-color: transparent;
    padding: 0;
    border: none;
    font-size: 0.875rem;
    line-height: 1.6;
    color: inherit;
    font-family: 'Fira Code', 'Courier New', monospace;
}

.markdown-content :deep(code) {
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.9em;
    font-family: 'Courier New', monospace;
    color: #dc2626;
}

.dark .markdown-content :deep(code) {
    background-color: #262626;
    color: #fca5a5;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
    margin-left: 2rem;
    margin-bottom: 1rem;
    color: #525252;
}

.dark .markdown-content :deep(ul),
.dark .markdown-content :deep(ol) {
    color: #a3a3a3;
}

.markdown-content :deep(li) {
    margin-bottom: 0.5rem;
}

.markdown-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
    border: 1px solid #e5e5e5;
    padding: 0.75rem;
    text-align: left;
}

.dark .markdown-content :deep(th),
.dark .markdown-content :deep(td) {
    border-color: #404040;
}

.markdown-content :deep(th) {
    background-color: #f5f5f5;
    font-weight: 600;
}

.dark .markdown-content :deep(th) {
    background-color: #262626;
}

aside::-webkit-scrollbar {
    width: 6px;
}

aside::-webkit-scrollbar-track {
    background: transparent;
}

aside::-webkit-scrollbar-thumb {
    background: rgba(115, 115, 115, 0.3);
    border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
    background: rgba(115, 115, 115, 0.5);
}

/* Mobile navigation transitions */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: opacity 0.3s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
    opacity: 0;
}

.mobile-nav-enter-active>div,
.mobile-nav-leave-active>div {
    transition: transform 0.3s ease;
}

.mobile-nav-enter-from>div,
.mobile-nav-leave-to>div {
    transform: translateX(-100%);
}
</style>

<style scoped>
/* Code Block Wrapper */
.markdown-content :deep(.code-block-wrapper) {
    position: relative;
    margin-bottom: 1rem;
}

.markdown-content :deep(.copy-button) {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 10;
    opacity: 0.7;
}

.markdown-content :deep(.copy-button:hover) {
    color: #ffffff;
    opacity: 1;
    transform: scale(1.1);
}

.markdown-content :deep(.copy-button.copied) {
    color: #22c55e;
    opacity: 1;
}

/* Markdown Content Styles */
.markdown-content :deep(h1) {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #171717;
}

.dark .markdown-content :deep(h1) {
    color: #fafafa;
}

.markdown-content :deep(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #262626;
}

.dark .markdown-content :deep(h2) {
    color: #e5e5e5;
}

.markdown-content :deep(h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: #404040;
}

.dark .markdown-content :deep(h3) {
    color: #d4d4d4;
}

.markdown-content :deep(p) {
    margin-bottom: 1rem;
    color: #525252;
    line-height: 1.75;
}

.dark .markdown-content :deep(p) {
    color: #a3a3a3;
}

.markdown-content :deep(pre.hljs) {
    background-color: #0d1117;
    padding: 1.25rem;
    border-radius: 0.75rem;
    overflow-x: auto;
    border: 1px solid #30363d;
}

.dark .markdown-content :deep(pre.hljs) {
    background-color: #0d1117;
    border-color: #30363d;
}

.markdown-content :deep(pre.hljs code) {
    background: transparent;
    padding: 0;
    border: none;
    font-size: 0.875rem;
    line-height: 1.6;
    color: inherit;
    font-family: 'Fira Code', 'Courier New', monospace;
}

.markdown-content :deep(code) {
    background: transparent;
    padding: 0;
    font-size: 0.9em;
    font-family: 'Courier New', monospace;
    color: inherit;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
    margin-left: 2rem;
    margin-bottom: 1rem;
    color: #525252;
}

.dark .markdown-content :deep(ul),
.dark .markdown-content :deep(ol) {
    color: #a3a3a3;
}

.markdown-content :deep(li) {
    margin-bottom: 0.5rem;
}

.markdown-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
    border: 1px solid #e5e5e5;
    padding: 0.75rem;
    text-align: left;
}

.dark .markdown-content :deep(th),
.dark .markdown-content :deep(td) {
    border-color: #404040;
}

.markdown-content :deep(th) {
    background-color: #f5f5f5;
    font-weight: 600;
}

.dark .markdown-content :deep(th) {
    background-color: #262626;
}

aside::-webkit-scrollbar {
    width: 6px;
}

aside::-webkit-scrollbar-track {
    background: transparent;
}

aside::-webkit-scrollbar-thumb {
    background: rgba(115, 115, 115, 0.3);
    border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
    background: rgba(115, 115, 115, 0.5);
}

/* Mobile navigation transitions */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: opacity 0.3s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
    opacity: 0;
}

.mobile-nav-enter-active>div,
.mobile-nav-leave-active>div {
    transition: transform 0.3s ease;
}

.mobile-nav-enter-from>div,
.mobile-nav-leave-to>div {
    transform: translateX(-100%);
}
</style>
