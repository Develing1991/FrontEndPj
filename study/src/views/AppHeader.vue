<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand style="margin-right: 1100px;">
            <router-link to="/main">
                <b-button pill variant="success">메인페이지</b-button>
            </router-link>
        </b-navbar-brand>
        <template v-if="loginUser.userLoginId">
            <strong style="margin-right:6px;"><span style="color:white; font-size:20px;">
                    {{loginUser.userLoginId}} 
                    </span>
            </strong>
                <b-button pill variant="danger" @click="logout">로그아웃</b-button>
        </template>
        <template v-else>
            <router-link to="/login">
                <b-button pill variant="success">로그인</b-button>
            </router-link>
        </template>
        <b-button variant="info">
            <b-icon-layout-text-sidebar v-b-toggle.sidebar-backdrop/>
        </b-button>
    </b-navbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState({
            loginUser: state => state.us.loginUser,
        })
    },
    methods: {
        logout() {
            this.$store.commit('us/SET_LOGOUT',this.loginUser);
            this.$router.push('/main');
        }
    },

}
</script>

<style scoped>

</style>