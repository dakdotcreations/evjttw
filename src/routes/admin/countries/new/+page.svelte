<script lang="ts">
import { superForm } from 'sveltekit-superforms';
import { zod4Client } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import ImageUpload from '$lib/components/ImageUpload.svelte';
import Input from '$lib/components/ui/Input.svelte';
import Textarea from '$lib/components/ui/Textarea.svelte';
import Button from '$lib/components/ui/Button.svelte';
import type { PageData } from './$types';

let { data }: { data: PageData } = $props();

const schema = z.object({
name: z.string().min(2),
code: z.string().length(2),
flagEmoji: z.string().optional(),
description: z.string().optional(),
imageUrl: z.string().optional()
});

const { form, errors, enhance, submitting } = superForm(data.form, {
validators: zod4Client(schema)
});
</script>

<div class="max-w-2xl">
<div class="mb-6">
<a href="/admin/countries" class="text-sm text-indigo-600 hover:underline">← Back to countries</a>
</div>

<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
<h2 class="mb-6 text-lg font-semibold text-gray-900">New Country</h2>

<form method="POST" action="?/createCountry" use:enhance enctype="multipart/form-data" class="space-y-5">
<div class="grid grid-cols-2 gap-5">
<Input name="name" label="Name" bind:value={$form.name} error={$errors.name} required />
<Input name="code" label="Code" hint="2-letter ISO code" bind:value={$form.code} error={$errors.code} maxlength={2} required />
</div>

<Input name="flagEmoji" label="Flag Emoji" placeholder="🇺🇬" bind:value={$form.flagEmoji} />

<Textarea name="description" label="Description" bind:value={$form.description} />

<ImageUpload name="imageUrl" label="Cover Image" bind:value={$form.imageUrl} />

<div class="pt-2">
<Button variant="primary" size="lg" type="submit" disabled={$submitting}>
{$submitting ? 'Creating…' : 'Create Country'}
</Button>
</div>
</form>
</div>
</div>