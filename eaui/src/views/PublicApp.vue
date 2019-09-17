<!-- The Endless Abyss -->
<template>
    <div id="publicApp">
        <router-view />
    </div>
</template>

<script>
import Login from '@/views/Login'
export default {
    name: 'PublicApp',
    components: { Login },
    created() {}
}
</script>
