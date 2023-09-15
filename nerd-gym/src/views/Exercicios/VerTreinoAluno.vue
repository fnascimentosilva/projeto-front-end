<template>
    <h1>Treino Aluno</h1>
    {{student_name}}
</template>

<script>
export default {
    data() {
        return {
            student_name: localStorage.getItem('student_name');
        }
    },
}
</script>