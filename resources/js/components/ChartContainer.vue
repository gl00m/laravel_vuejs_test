<template>
    <div class="chart-container">
        <trend
        :data="chartData"
        :gradient="['#6fa8dc']"
        auto-draw
        smooth
        >
    </trend>
    </div>
</template>

<script>
import Trend from "vuetrend"

export default {
    computed: {
        chartData() {
            return(this.$store.state.tempData);
        }
    }
}
</script>
