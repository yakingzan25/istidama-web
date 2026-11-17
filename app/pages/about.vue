<script setup lang="ts">
import { Target, Rocket, Shield, Lightbulb, Users, CheckCircle2 } from 'lucide-vue-next'

const siteSettings = useState<any>('siteSettings')

const values = [
  {
    title: 'الاستدامة والأثر',
    desc: 'نركز على بناء حلول طويلة الأمد تحقق نمواً مستداماً وتحافظ على الموارد.',
    icon: Shield
  },
  {
    title: 'الابتكار المستمر',
    desc: 'نتبنى أحدث التقنيات والأساليب الإدارية لتقديم خدمات تتجاوز التوقعات.',
    icon: Lightbulb
  },
  {
    title: 'الشراكة والشفافية',
    desc: 'نؤمن ببناء علاقات متينة قائمة على الثقة والوضوح مع عملائنا وشركائنا.',
    icon: Users
  }
]
</script>

<template>
  <div class="space-y-14">
    
    <!-- ترويسة الصفحة -->
    <div class="text-center max-w-3xl mx-auto">
      <span class="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
        تعرف علينا عن قرب
      </span>
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4">
        نبذة عن {{ siteSettings?.companyName || 'مؤسسة الاستدامة' }}
      </h1>
      <p class="text-slate-400 text-base sm:text-lg leading-relaxed">
        {{ siteSettings?.tagline }}
      </p>
    </div>

    <!-- بطاقة التعريف بالمؤسسة -->
    <div class="rounded-3xl bg-slate-900/70 border border-slate-800 p-8 sm:p-12 shadow-xl">
      <div class="max-w-4xl mx-auto space-y-6">
        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
          <span class="w-2 h-8 rounded-full bg-emerald-500 inline-block"></span>
          <span>من نحن؟</span>
        </h2>
        <p class="text-slate-300 text-base sm:text-lg leading-loose">
          {{ siteSettings?.aboutText }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div class="flex items-center gap-3 text-slate-300 text-sm">
            <CheckCircle2 class="w-5 h-5 text-emerald-400 shrink-0" />
            <span>التزام تام بأعلى معايير الجودة والاحترافية</span>
          </div>
          <div class="flex items-center gap-3 text-slate-300 text-sm">
            <CheckCircle2 class="w-5 h-5 text-emerald-400 shrink-0" />
            <span>فريق عمل متخصص وذو خبرة واسعة</span>
          </div>
        </div>
      </div>
    </div>

    <!-- بطاقتا الرؤية والرسالة -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 hover:border-emerald-500/40 p-8 sm:p-10 transition-all">
        <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-6">
          <Target class="w-7 h-7" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-4">رؤيتنا</h3>
        <p class="text-slate-300 leading-relaxed text-base">
          {{ siteSettings?.vision }}
        </p>
      </div>

      <div class="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 hover:border-cyan-500/40 p-8 sm:p-10 transition-all">
        <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-6">
          <Rocket class="w-7 h-7" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-4">رسالتنا</h3>
        <p class="text-slate-300 leading-relaxed text-base">
          {{ siteSettings?.mission }}
        </p>
      </div>
    </div>

    <!-- قيمنا الجوهرية -->
    <div>
      <h2 class="text-2xl font-bold text-white text-center mb-8">قيمنا الجوهرية</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="val in values"
          :key="val.title"
          class="rounded-2xl bg-slate-900/60 border border-slate-800 p-7 hover:border-emerald-500/30 transition-all"
        >
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-5">
            <component :is="val.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">{{ val.title }}</h3>
          <p class="text-slate-400 text-sm leading-relaxed">{{ val.desc }}</p>
        </div>
      </div>
    </div>

  </div>
</template>