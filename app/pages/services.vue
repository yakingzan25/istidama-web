<script setup lang="ts">
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '~/utils/firebase'
import { Briefcase, CheckCircle2, ArrowLeft } from 'lucide-vue-next'

const services = ref<any[]>([])
const loading = ref(true)

onMounted(() => {
  onSnapshot(collection(db, 'services'), (snap) => {
    services.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    loading.value = false
  })
})
</script>

<template>
  <div class="space-y-12">
    <div class="text-center max-w-3xl mx-auto">
      <span class="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
        حلول متكاملة
      </span>
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">خدماتنا</h1>
      <p class="text-slate-400 text-base sm:text-lg leading-relaxed">
        نقدم باقة متكاملة من الخدمات المصممة بعناية لتلبية احتياجات عملائنا وتحقيق أهدافهم بكفاءة واستدامة.
      </p>
    </div>

    <div v-if="loading" class="text-center py-12 text-slate-400">جاري تحميل الخدمات...</div>

    <div v-else-if="services.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="srv in services"
        :key="srv.id"
        class="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5"
      >
        <div>
          <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
            <span v-if="srv.icon" class="text-2xl">{{ srv.icon }}</span>
            <Briefcase v-else class="w-7 h-7" />
          </div>
          <h2 class="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
            {{ srv.title }}
          </h2>
          <p class="text-slate-400 text-sm leading-relaxed mb-6">
            {{ srv.description }}
          </p>
        </div>

        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <CheckCircle2 class="w-4 h-4" />
            <span>متاح للطلب</span>
          </span>
          <NuxtLink to="/contact" class="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors">
            <span>اطلب الخدمة</span>
            <ArrowLeft class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-14 text-center">
      <Briefcase class="w-12 h-12 text-slate-600 mx-auto mb-3" />
      <p class="text-slate-400">لا توجد خدمات مضافة حالياً. يمكنك إضافتها من لوحة التحكم.</p>
    </div>
  </div>
</template>