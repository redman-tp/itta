<template>
  <q-footer class="itta-bottom-nav">
    <q-tabs align="justify" dense active-color="primary" no-caps class="itta-bottom-tabs">
      <q-route-tab
        v-for="item in items"
        :key="item.to"
        :icon="item.icon"
        :label="item.label"
        :to="item.to"
      />
    </q-tabs>
  </q-footer>
</template>

<script setup lang="ts">
interface NavItem {
  label: string;
  icon: string;
  to: string;
}

interface Props {
  items: NavItem[];
}

defineProps<Props>();
</script>
