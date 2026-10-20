<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { onMount } from "svelte";
import {
	getCategoryUrl,
	getPostUrlBySlug,
	getTagUrl,
	url,
} from "../utils/url-utils";

interface Post {
	slug: string;
	data: {
		title: string;
		published: Date | string;
		updated?: Date | string;
		description?: string;
		image?: string;
		tags: string[];
		category?: string | null;
		series?: string;
		seriesOrder?: number;
		series_order?: number;
		draft?: boolean;
		secret?: boolean;
	};
	words?: number;
	minutes?: number;
}

export let sortedPosts: Post[] = [];
export let correctPassword = "admin";
export let title = "个人专区";
export let description = "此区域包含个人学习笔记与私密草稿，需要输入密码访问。";

let isUnlocked = false;
let passwordInput = "";
let errorMessage = "";

const STORAGE_KEY = "blog_secret_unlocked";

function formatDate(date: Date | string) {
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return "";
	const y = d.getFullYear();
	const m = (d.getMonth() + 1).toString().padStart(2, "0");
	const day = d.getDate().toString().padStart(2, "0");
	return `${y}-${m}-${day}`;
}

function getCoverUrl(src?: string) {
	if (!src) return "";
	if (
		src.startsWith("http://") ||
		src.startsWith("https://") ||
		src.startsWith("data:")
	) {
		return src;
	}
	return url(src);
}

function handleUnlock() {
	if (passwordInput.trim() === correctPassword.trim()) {
		isUnlocked = true;
		errorMessage = "";
		localStorage.setItem(STORAGE_KEY, "true");
	} else {
		errorMessage = "密码错误，请重新输入";
	}
}

function handleLock() {
	isUnlocked = false;
	passwordInput = "";
	errorMessage = "";
	localStorage.removeItem(STORAGE_KEY);
}

function handleKeyDown(event: KeyboardEvent) {
	if (event.key === "Enter") {
		handleUnlock();
	}
}

onMount(() => {
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === "true") {
		isUnlocked = true;
	}
});
</script>

{#if !isUnlocked}
    <!-- 未解锁状态：密码输入界面 -->
    <div class="card-base px-6 md:px-8 py-8 transition-all">
        <div class="max-w-md mx-auto text-center py-6 onload-animation">
            <div class="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mx-auto mb-5 text-3xl shadow-sm">
                🔒
            </div>
            <h2 class="text-2xl font-bold text-black/90 dark:text-white/90 mb-2">{title}</h2>
            <p class="text-sm text-black/50 dark:text-white/50 mb-6 leading-relaxed">{description}</p>

            <div class="space-y-4">
                <div class="relative">
                    <input
                        type="password"
                        bind:value={passwordInput}
                        on:keydown={handleKeyDown}
                        placeholder="请输入访问密码..."
                        class="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/90 dark:text-white/90 placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition text-center text-lg tracking-wider"
                    />
                </div>

                {#if errorMessage}
                    <div class="text-sm text-red-500 font-medium transition animate-pulse">
                        {errorMessage}
                    </div>
                {/if}

                <button
                    on:click={handleUnlock}
                    class="w-full py-3 px-6 rounded-xl bg-[var(--primary)] text-white font-semibold shadow hover:opacity-90 active:scale-[0.98] transition cursor-pointer"
                >
                    解 锁 访 问
                </button>
            </div>
        </div>
    </div>
{:else}
    <!-- 已解锁状态：顶部控制栏 + 类似主页的卡片流布局 -->
    <div>
        <div class="card-base px-6 py-4 mb-4 flex items-center justify-between transition-all onload-animation">
            <div class="flex items-center gap-2.5">
                <span class="text-2xl">🔓</span>
                <div>
                    <div class="flex items-center gap-2">
                        <h2 class="text-xl font-bold text-black/90 dark:text-white/90">{title}</h2>
                        <span class="text-xs px-2.5 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-semibold border border-[var(--primary)]/20">
                            共 {sortedPosts.length} 篇
                        </span>
                    </div>
                    <p class="text-xs text-black/40 dark:text-white/40 mt-0.5 hidden sm:block">私密专区文章仅在解锁状态下展示</p>
                </div>
            </div>
            <button
                on:click={handleLock}
                class="text-xs px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:text-red-500 hover:border-red-400 hover:bg-red-500/5 transition cursor-pointer flex items-center gap-1.5 font-medium active:scale-95"
                title="清除本地凭证并重新上锁"
            >
                <span>🔒</span>
                <span>锁定退出</span>
            </button>
        </div>

        {#if sortedPosts.length === 0}
            <div class="card-base text-center py-16 text-black/40 dark:text-white/40 rounded-[var(--radius-large)] onload-animation">
                暂无私密文章记录
            </div>
        {:else}
            <div class="transition flex flex-col rounded-[var(--radius-large)] bg-[var(--card-bg)] py-1 md:py-0 md:bg-transparent md:gap-4 mb-4">
                {#each sortedPosts as post, idx}
                    <div
                        class="card-base flex flex-col-reverse md:flex-col w-full rounded-[var(--radius-large)] overflow-hidden relative onload-animation"
                        style="animation-delay: calc(var(--content-delay, 0ms) + {idx * 50}ms);"
                    >
                        <div class="pl-6 md:pl-9 pr-6 md:pr-2 pt-6 md:pt-7 pb-6 relative {post.data.image ? 'w-full md:w-[calc(100%_-_28%_-_12px)]' : 'w-full md:w-[calc(100%_-_52px_-_12px)]'}">
                            {#if post.data.series}
                                <div class="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                                    <Icon icon="material-symbols:menu-book-rounded" class="text-sm" />
                                    <span>专栏 · {post.data.series}{post.data.seriesOrder ?? post.data.series_order ? ` · 第 ${post.data.seriesOrder ?? post.data.series_order} 篇` : ""}</span>
                                </div>
                            {/if}

                            <a
                                href={getPostUrlBySlug(post.slug)}
                                class="transition group w-full block font-bold mb-3 text-3xl text-90
                                hover:text-[var(--primary)] dark:hover:text-[var(--primary)]
                                active:text-[var(--title-active)] dark:active:text-[var(--title-active)]
                                before:w-1 before:h-5 before:rounded-md before:bg-[var(--primary)]
                                before:absolute before:top-[35px] before:left-[18px] before:hidden md:before:block"
                            >
                                {post.data.title}
                                <Icon icon="material-symbols:chevron-right-rounded" class="inline text-[2rem] text-[var(--primary)] md:hidden translate-y-0.5 absolute" />
                                <Icon icon="material-symbols:chevron-right-rounded" class="text-[var(--primary)] text-[2rem] transition hidden md:inline absolute translate-y-0.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0" />
                            </a>

                            <!-- metadata -->
                            <div class="flex flex-wrap text-neutral-500 dark:text-neutral-400 items-center gap-4 gap-x-4 gap-y-2 mb-4">
                                <!-- publish date -->
                                <div class="flex items-center">
                                    <div class="meta-icon">
                                        <Icon icon="material-symbols:calendar-today-outline-rounded" class="text-xl" />
                                    </div>
                                    <span class="text-50 text-sm font-medium">{formatDate(post.data.published)}</span>
                                </div>

                                <!-- categories -->
                                <div class="flex items-center">
                                    <div class="meta-icon">
                                        <Icon icon="material-symbols:book-2-outline-rounded" class="text-xl" />
                                    </div>
                                    <div class="flex flex-row flex-nowrap items-center">
                                        <a
                                            href={getCategoryUrl(post.data.category || null)}
                                            aria-label={`View all posts in the ${post.data.category} category`}
                                            class="link-lg transition text-50 text-sm font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)] whitespace-nowrap"
                                        >
                                            {post.data.category || i18n(I18nKey.uncategorized)}
                                        </a>
                                    </div>
                                </div>

                                <!-- tags -->
                                <div class="items-center hidden md:flex">
                                    <div class="meta-icon">
                                        <Icon icon="material-symbols:tag-rounded" class="text-xl" />
                                    </div>
                                    <div class="flex flex-row flex-nowrap items-center">
                                        {#if post.data.tags && post.data.tags.length > 0}
                                            {#each post.data.tags as tag, i}
                                                {#if i > 0}
                                                    <div class="mx-1.5 text-[var(--meta-divider)] text-sm">/</div>
                                                {/if}
                                                <a
                                                    href={getTagUrl(tag)}
                                                    aria-label={`View all posts with the ${tag.trim()} tag`}
                                                    class="link-lg transition text-50 text-sm font-medium hover:text-[var(--primary)] dark:hover:text-[var(--primary)] whitespace-nowrap"
                                                >
                                                    {tag.trim()}
                                                </a>
                                            {/each}
                                        {:else}
                                            <div class="transition text-50 text-sm font-medium">{i18n(I18nKey.noTags)}</div>
                                        {/if}
                                    </div>
                                </div>
                            </div>

                            <!-- description -->
                            {#if post.data.description}
                                <div class="transition text-75 mb-3.5 pr-4 line-clamp-2 md:line-clamp-1">
                                    {post.data.description}
                                </div>
                            {/if}

                            <!-- word count and read time -->
                            {#if post.words !== undefined && post.minutes !== undefined}
                                <div class="text-sm text-black/30 dark:text-white/30 flex gap-4 transition">
                                    <div>
                                        {post.words} {i18n(post.words === 1 ? I18nKey.wordCount : I18nKey.wordsCount)}
                                    </div>
                                    <div>|</div>
                                    <div>
                                        {post.minutes} {i18n(post.minutes === 1 ? I18nKey.minuteCount : I18nKey.minutesCount)}
                                    </div>
                                </div>
                            {/if}
                        </div>

                        {#if post.data.image}
                            <a
                                href={getPostUrlBySlug(post.slug)}
                                aria-label={post.data.title}
                                class="group max-h-[20vh] md:max-h-none mx-4 mt-4 -mb-2 md:mb-0 md:mx-0 md:mt-0 md:w-[28%] relative md:absolute md:top-3 md:bottom-3 md:right-3 rounded-xl overflow-hidden active:scale-95 block"
                            >
                                <div class="absolute pointer-events-none z-10 w-full h-full group-hover:bg-black/30 group-active:bg-black/50 transition"></div>
                                <div class="absolute pointer-events-none z-20 w-full h-full flex items-center justify-center">
                                    <Icon
                                        icon="material-symbols:chevron-right-rounded"
                                        class="transition opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 text-white text-5xl"
                                    />
                                </div>
                                <div class="w-full h-full overflow-hidden relative">
                                    <div class="transition absolute inset-0 dark:bg-black/10 bg-opacity-50 pointer-events-none"></div>
                                    <img
                                        src={getCoverUrl(post.data.image)}
                                        alt={post.data.title}
                                        class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            </a>
                        {:else}
                            <a
                                href={getPostUrlBySlug(post.slug)}
                                aria-label={post.data.title}
                                class="!hidden md:!flex btn-regular w-[3.25rem] absolute right-3 top-3 bottom-3 rounded-xl bg-[var(--enter-btn-bg)] hover:bg-[var(--enter-btn-bg-hover)] active:bg-[var(--enter-btn-bg-active)] active:scale-95 items-center justify-center"
                            >
                                <Icon icon="material-symbols:chevron-right-rounded" class="transition text-[var(--primary)] text-4xl mx-auto" />
                            </a>
                        {/if}
                    </div>
                    <div class="transition border-t-[1px] border-dashed mx-6 border-black/10 dark:border-white/[0.15] last:border-t-0 md:hidden"></div>
                {/each}
            </div>
        {/if}
    </div>
{/if}
