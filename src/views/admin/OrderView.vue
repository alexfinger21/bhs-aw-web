<template>
  <div class="admin-orders-page">
    <Section :imageUrl="url1">
        <h1>Order Management 📋</h1>
        <div class="txt-block">
            <p>View and manage all customer orders for your handcrafted collection</p>
        </div>
    </Section>
    <Divider :margin="3"/>
    
    <div class="filters">
      <select v-model="statusFilter" class="filter-select">
        <option value="all">All Orders</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
      
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search orders..." 
        class="search-input"
      >
    </div>
    
    <div v-if="loading" class="loading">
      <p>Loading orders...</p>
    </div>
    
    <div v-else-if="filteredOrders.length === 0" class="no-orders">
      <h4>No orders found</h4>
    </div>
    
    <div v-else class="orders-container">
      <div 
        v-for="order in filteredOrders" 
        :key="order.id" 
        class="order-card"
        :class="'status-' + order.status"
      >
        <div class="order-header">
          <h3>Order #{{ order.id }}</h3>
          <span class="order-status" :class="order.status">{{ order.status }}</span>
        </div>
        
        <div class="order-details">
          <div class="customer-info">
            <p><strong>Customer:</strong> {{ order.customer.name }}</p>
            <p><strong>Email:</strong> {{ order.customer.email }}</p>
            <p><strong>Phone:</strong> {{ order.customer.phone }}</p>
          </div>
          
          <div class="shipping-info">
            <p><strong>Shipping Address:</strong></p>
            <p>{{ order.shipping.address }}, {{ order.shipping.city }}</p>
            <p>{{ order.shipping.state }}, {{ order.shipping.zip }}</p>
          </div>
        </div>
        
        <div class="order-items">
          <h4>Items:</h4>
          <div 
            v-for="item in order.items" 
            :key="item.productId" 
            class="order-item"
          >
            <span class="item-name">{{ item.name }} ({{ item.size }})</span>
            <span class="item-quantity">Qty: {{ item.quantity }}</span>
            <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="order-footer">
          <p class="order-total"><strong>Total: ${{ order.total.toFixed(2) }}</strong></p>
          <p class="order-date">Placed on: {{ order.date }}</p>
          
          <div class="order-actions">
            <select v-model="order.status" class="status-select">
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <button class="btn btn-small">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>