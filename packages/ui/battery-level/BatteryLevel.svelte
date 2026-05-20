<script lang="ts">
  import { 
    Battery, 
    BatteryCharging, 
    BatteryFull, 
    BatteryMedium, 
    BatteryLow, 
    BatteryWarning 
  } from '@lucide/svelte';

  // 1. Reactive state using $state
  let level = $state<number | null>(null);
  let charging = $state<boolean>(false);
  let supported = $state<boolean>(true);
  
  // Update helper
  function updateBatteryStatus(manager: any) {
    level = Math.round(manager.level * 100);
    charging = manager.charging;
  }

  // 2. Lifecycle and side-effects using $effect
  $effect(() => {
    // Check if the Battery API is supported in the current environment
    if (!('getBattery' in navigator)) {
      supported = false;
      return;
    }

    let managerRef: any;
    
    // Event listener reference for proper cleanup
    const updateHandler = () => {
      if (managerRef) updateBatteryStatus(managerRef);
    };

    (navigator as any).getBattery()
      .then((manager: any) => {
        managerRef = manager;
        updateBatteryStatus(manager);

        manager.addEventListener('levelchange', updateHandler);
        manager.addEventListener('chargingchange', updateHandler);
      })
      .catch(() => {
        supported = false;
      });

    // Cleanup function runs when the component is unmounted
    return () => {
      if (managerRef) {
        managerRef.removeEventListener('levelchange', updateHandler);
        managerRef.removeEventListener('chargingchange', updateHandler);
      }
    };
  });

  // 3. Computed values using $derived.by
  const BatteryIcon = $derived.by(() => {
    if (charging) return BatteryCharging;
    if (level === null) return Battery;
    if (level >= 80) return BatteryFull;
    if (level >= 50) return BatteryMedium;
    if (level >= 20) return BatteryLow;
    return BatteryWarning;
  });

  const iconColor = $derived.by(() => {
    if (charging) return '#10b981'; // emerald-500
    if (level === null) return '#9ca3af'; // gray-400
    if (level >= 80) return '#10b981'; // emerald-500
    if (level >= 50) return '#fbbf24'; // amber-400
    if (level >= 20) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  });
</script>

<div class="battery-container">
  {#if !supported}
    <div class="status-box error">
      <Battery color="#ef4444" size={24} />
      <span>Battery API not supported (requires HTTPS/Chromium)</span>
    </div>
  {:else if level !== null}
    <div class="status-box">
      <!-- Svelte 5 can render components dynamically just like this -->
      <BatteryIcon color={iconColor} size={28} />
      
      <span class="level-text" style="color: {iconColor}">{level}%</span>
      
      {#if charging}
        <span class="charging-badge">Charging</span>
      {/if}
    </div>
  {:else}
    <div class="status-box loading">
      <Battery color="#9ca3af" size={28} class="pulse" />
      <span>Reading status...</span>
    </div>
  {/if}
</div>

<style>
  .battery-container {
    position: fixed;
    top: var(--gap-2);
    left: var(--gap-2);
    background-color: #111827; /* gray-900 */
    border: 1px solid #374151; /* gray-700 */
    border-radius: 0.75rem;
    padding: 1.25rem 1.5rem;
    display: inline-block;
    font-family: system-ui, -apple-system, sans-serif;
    color: #f3f4f6; /* gray-100 */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  }

  .status-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .level-text {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1;
  }

  .charging-badge {
    font-size: 0.75rem;
    font-weight: 500;
    color: #10b981;
    background-color: rgba(16, 185, 129, 0.15);
    padding: 0.25rem 0.6rem;
    border-radius: 9999px;
    margin-left: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .error {
    color: #ef4444;
    font-size: 0.875rem;
  }

  .loading {
    color: #9ca3af;
    font-size: 0.875rem;
  }

  :global(.pulse) {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
  }
</style>