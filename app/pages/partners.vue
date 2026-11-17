<script setup lang="ts">
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '~/utils/firebase'
import { Handshake, ExternalLink } from 'lucide-vue-next'

const partners = ref<any[]>([])
const loading = ref(true)

onMounted(() => {
  onSnapshot(collection(db, 'partners'), (snap) => {
    partners.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    loading.value = false
  })
})
</script>

<template>
  <div class="space-y-12">
    <div class="text-center max-w-3xl mx-auto">
      <span class="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
        شراكات استراتيجية
      </span>
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">شركاء النجاح</h1>
      <p class="text-slate-400 text-base sm:text-lg leading-relaxed">
        نفخر بشراكاتنا المثمرة مع نخبة من المؤسسات والجهات الرائدة لتحقيق أهداف التنمية والاستدامة المشتركة.
      </p>
    </div>

    <div v-if="loading" class="text-center py-12 text-slate-400">جاري تحميل الشركاء...</div>

    <div v-else-if="partners.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="partner in partners"
        :key="partner.id"
        class="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 p-7 text-center transition-all duration-300 hover:-translate-y-1"
      >
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mx-auto mb-5 group-hover:scale-110 transition-transform">
          <span v-if="partner.logo" class="text-3xl">{{ partner.logo }}</span>
          <Handshake v-else class="w-8 h-8" />
        </div>
        <h2 class="text-xl font-bold text-white mb-2">{{ partner.name }}</h2>
        <p class="text-slate-400 text-sm leading-relaxed mb-4">{{ partner.description }}</p>
        <a
          v-if="partner.website"
          :href="partner.website"
          target="_blank"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
        >
          <span>زيارة الموقع</span>
          <ExternalLink class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>

    <div v-else class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-14 text-center">
      <Handshake class="w-12 h-12 text-slate-600 mx-auto mb-3" />
      <p class="text-slate-400">لم يتم إضافة شركاء بعد. يمكنك إضافة الشركاء من لوحة التحكم.</p>
    </div>
  </div>
</template>