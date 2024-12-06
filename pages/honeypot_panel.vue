<template>
    <div class="m1">
        <h1 class="m1">Intrusions détectées</h1>
        <UTable :rows="intrusions" />
    </div>

    <div class="m1">
        <h1 class="m1">IP bloquées</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>IP Address</th>
                    <th>Blocked At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in filteredBlocked" :key="row.ipAddress">
                    <td>{{ row.ipAddress }}</td>
                    <td>{{ row.createdAt }}</td>
                    <td>
                        <button @click="confirmUnblock(row.ipAddress)" class="btn-unblock">
                            Unblock
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Récupération des données via l'API
const intrusions = await $fetch("/api/honeypot/intrusion");
const blocked = ref(await $fetch("/api/honeypot/blocked"));

// Filtrer les entrées avec `blocked: true`
const filteredBlocked = computed(() =>
    blocked.value.filter((entry) => entry.blocked === true)
);

// Fonction pour débloquer une IP avec confirmation
const confirmUnblock = async (ipAddress: string) => {
    if (confirm(`Are you sure you want to unblock the IP: ${ipAddress}?`)) {
        try {
            await $fetch("/api/honeypot/unblockAddress", {
                method: "POST",
                body: { ipAddress },
            });
            // Supprimer immédiatement l'entrée localement après confirmation
            blocked.value = blocked.value.filter(
                (entry) => entry.ipAddress !== ipAddress
            );
            alert(`IP ${ipAddress} unblocked successfully!`);
        } catch (error) {
            console.error("Failed to unblock IP:", error);
            alert(`Failed to unblock IP ${ipAddress}. Please try again.`);
        }
    }
};
</script>

<style>
.m1 {
    margin: 0.5rem;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

.table th, .table td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: left;
}

.btn-unblock {
    background-color: #ff4d4f;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
}

.btn-unblock:hover {
    background-color: #ff7875;
}
</style>
