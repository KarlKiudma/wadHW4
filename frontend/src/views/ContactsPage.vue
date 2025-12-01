<template>
  <div class="contact-page">
    <div class="contact-card">
      <h3>Contact Us</h3>

      <p>
        If you have any questions or need assistance, feel free to contact us.
      </p>

      <ul>
        <li><strong>Email:</strong> support@example.com</li>
        <li><strong>Phone:</strong> +372 5555 5555</li>
        <li><strong>Address:</strong> University of Tartu, Estonia</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactUsView"
};
</script>

<style scoped>
.contact-page {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-card {
  background-color: rgb(255, 102, 82);
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 320px;
}

h3 {
  text-align: center;
  color: white;
  margin-bottom: 16px;
}

p {
  color: white;
  margin-bottom: 12px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  color: white;
}

li {
  margin-bottom: 8px;
}
</style>