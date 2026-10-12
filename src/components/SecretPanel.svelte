<script lang="ts">
import { onMount } from "svelte";
import { getPostUrlBySlug } from "../utils/url-utils";

interface Post {
	slug: string;
	data: {
		title: string;
		tags: string[];
		category?: string | null;
		published: Date;
	};
}

interface Group {
	year: number;
	posts: Post[];
}

export let sortedPosts: Post[] = [];
export let correctPassword = "admin";
export let title = "个人专区";
export let description = "此区域包含个人学习笔记与私密草稿，需要输入密码访问。";

let isUnlocked = false;
let passwordInput = "";
let errorMessage = "";
let groups: Group[] = [];

const STORAGE_KEY = "blog_secret_unlocked";

function formatDate(date: Date) {
	const d = new Date(date);
	const month = (d.getMonth() + 1).toString().padStart(2, "0");
	const day = d.getDate().toString().padStart(2, "0");
	return `${month}-${day}`;
}

function formatTag(tagList: string[]) {
	if (!Array.isArray(tagList)) return "";
	return tagList.map((t) => `#${t}`).join(" ");
}

function processGroups(posts: Post[]) {
	const grouped = posts.reduce(
		(acc, post) => {
			const year = new Date(post.data.published).getFullYear();
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(post);
			return acc;
		},
		{} as Record<number, Post[]>,
	);

	const groupedPostsArray = Object.keys(grouped).map((yearStr) => ({
		year: Number.parseInt(yearStr, 10),
		posts: grouped[Number.parseInt(yearStr, 10)],
	}));

	groupedPostsArray.sort((a, b) => b.year - a.year);
	groups = groupedPostsArray;
}

$: if (sortedPosts && sortedPosts.length > 0) {
	processGroups(sortedPosts);
}

onMount(() => {
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === "true") {
		isUnlocked = true;
	}
	processGroups(sortedPosts);
});

function handleUnlock() {
	if (passwordInput.trim() === correctPassword.trim()) {
		isUnlocked = true;
		errorMessage = "";
		localStorage.setItem(STORAGE_KEY, "true");
		processGroups(sortedPosts);
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
</script>

<div class="card-base px-6 md:px-8 py-8 transition-all">
    {#if !isUnlocked}
        <!-- 未解锁状态：密码输入界面 -->
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
    {:else}
        <!-- 已解锁状态：展示私密文章列表 -->
        <div class="onload-animation">
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-[var(--line-divider)] border-dashed">
                <div class="flex items-center gap-2">
                    <span class="text-xl">🔓</span>
                    <h2 class="text-xl font-bold text-black/90 dark:text-white/90">{title}</h2>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-medium">
                        共 {sortedPosts.length} 篇
                    </span>
                </div>
                <button
                    on:click={handleLock}
                    class="text-xs px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:text-red-500 hover:border-red-400 transition cursor-pointer"
                    title="清除本地凭证并重新上锁"
                >
                    🔒 锁定退出
                </button>
            </div>

            {#if groups.length === 0}
                <div class="text-center py-12 text-black/40 dark:text-white/40">
                    暂无私密文章记录
                </div>
            {:else}
                {#each groups as group}
                    <div>
                        <div class="flex flex-row w-full items-center h-[3.75rem]">
                            <div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
                                {group.year}
                            </div>
                            <div class="w-[15%] md:w-[10%]">
                                <div class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"></div>
                            </div>
                            <div class="w-[70%] md:w-[80%] transition text-left text-50">
                                {group.posts.length} 篇
                            </div>
                        </div>

                        {#each group.posts as post}
                            <a
                                href={getPostUrlBySlug(post.slug)}
                                aria-label={post.data.title}
                                class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
                            >
                                <div class="flex flex-row justify-start items-center h-full">
                                    <!-- date -->
                                    <div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
                                        {formatDate(post.data.published)}
                                    </div>

                                    <!-- dot and line -->
                                    <div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
                                        <div
                                            class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5
                                                   bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
                                                   outline outline-4 z-50
                                                   outline-[var(--card-bg)]
                                                   group-hover:outline-[var(--btn-plain-bg-hover)]
                                                   group-active:outline-[var(--btn-plain-bg-active)]"
                                        ></div>
                                    </div>

                                    <!-- post title -->
                                    <div
                                        class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold
                                               group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)]
                                               text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden"
                                    >
                                        {post.data.title}
                                    </div>

                                    <!-- tag list -->
                                    <div
                                        class="hidden md:block md:w-[15%] text-left text-sm transition
                                               whitespace-nowrap overflow-ellipsis overflow-hidden text-30"
                                    >
                                        {formatTag(post.data.tags)}
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
</div>
