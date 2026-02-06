<template>
  <section class="itta-section">
    <div class="row items-center justify-between">
      <div class="text-subtitle1 text-weight-medium">Top fashioneers</div>
      <BaseButton type="text" label="Browse all" to="/auth" />
    </div>
    <div class="itta-rail-wrap">
      <div class="row no-wrap scroll q-gutter-sm q-mt-sm itta-rail">
        <BaseCard
          v-for="fashioneer in fashioneers"
          :key="fashioneer.id"
          ui-key="card:fashioneer"
          class="itta-rail-card"
        >
          <div class="row items-center q-gutter-sm">
            <q-avatar size="40px" color="grey-3" text-color="primary">
              {{ fashioneer.name.split(' ').map((part) => part[0]).join('') }}
            </q-avatar>
            <div>
              <div class="text-body2 text-weight-medium">
                {{ fashioneer.name }}
                <q-icon v-if="fashioneer.verified" name="verified" color="primary" size="16px" />
              </div>
              <div class="text-caption text-grey-7">
                {{ fashioneer.rating }} Â· {{ fashioneer.location }}
              </div>
            </div>
          </div>
          <BaseButton class="q-mt-sm" type="ghost" label="Check me out" to="/auth" />
        </BaseCard>
        <BaseCard title="Browse all fashioneers" ui-key="card:browse-fashioneer" class="itta-rail-card">
          <BaseButton type="text" label="Explore" to="/auth" />
        </BaseCard>
      </div>
      <div class="itta-rail-arrow">
        <q-icon name="chevron_right" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from 'components/base/BaseButton.vue';
import BaseCard from 'components/base/BaseCard.vue';
import { mockFashioneers } from 'src/data/mock-data';

const fashioneers = mockFashioneers;
</script>
