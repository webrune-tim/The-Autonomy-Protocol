<script lang="ts">
  import { motion } from "$lib/actions/motion";
  
  let isHovered = $state(false);
  let isFocused = $state(false);

  // Combine hover and focus states for the animation trigger
  const isActive = $derived(isHovered || isFocused);
</script>

<button 
  type="button"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
  onfocus={() => isFocused = true}
  onblur={() => isFocused = false}
  use:motion={() => ({
    keyframes: { 
      scale: isActive ? 1.15 : 1,
      rotate: isActive ? 8 : 0,
      backgroundColor: isActive ? "#313244" : "#1e1e2e"
    },
    options: { 
      type: "spring", 
      stiffness: 260, 
      damping: 20 
    }
  })}
  class="card"
>
  Interact With Me
</button>

<style>
  .card {
    /* Reset default button styles */
    all: unset;
    box-sizing: border-box;
    
    width: 200px;
    height: 120px;
    background: #1e1e2e;
    border: 1px solid #45475a;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cdd6f4;
    cursor: pointer;
    user-select: none;
    text-align: center;
    transition: outline 0.2s ease;
  }

  /* Ensure focus visibility for keyboard users */
  .card:focus-visible {
    outline: 2px solid #fab387;
    outline-offset: 4px;
  }
</style>