<script setup lang="ts">
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '~/utils/firebase'
import { Newspaper, Calendar } from 'lucide-vue-next'

const newsList = ref<any[]>([])
const loading = ref(true)

onMounted(() => {
  onSnapshot(collection(db, 'news'), (snap) => {
    newsList.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    loading.value = false
  })
})
</script>

<template>
  <div class="space-y-12">
    <div class="text-center max-w-3xl mx-auto">
      <span class="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
        المركز الإعلامي
      </span>
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">الأخبار والمستجدات</h1>
      <p class="text-slate-400 text-base sm:text-lg leading-relaxed">
        تابع أحدث أخبار المؤسسة، مبادراتنا، وفعالياتنا المستمرة أولاً بأول.
      </p>
    </div>

    <div v-if="loading" class="text-center py-12 text-slate-400">جاري تحميل الأخبار...</div>

    <div v-else-if="newsList.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="item in newsList"
        :key="item.id"
        class="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 p-8 transition-all duration-300"
      >
        <div class="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">
          <Calendar class="w-3.5 h-3.5" />
          <span>{{ item.date || 'خبر حديث' }}</span>
        </div>
        <h2 class="text-2xl font-bold text-white mb-4 leading-snug">{{ item.title }}</h2>
        <p class="text-slate-300 text-base leading-loose whitespace-pre-line">{{ item.content }}</p>
      </article>
    </div>

    <div v-else class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-14 text-center">
      <Newspaper class="w-12 h-12 text-slate-600 mx-auto mb-3" />
      <p class="text-slate-400">لا توجد أخبار منشورة حالياً. يمكنك نشر الأخبار من لوحة التحكم.</p>
    </div>
  </div>
</template>