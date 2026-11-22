export const ROLE_SUBTABS = {
  warga: [
    { id: 'retribusi', title: 'Retribusi', icon: '💳' },
    { id: 'mata-air', title: 'Mata Air', icon: '💧' },
    { id: 'laporan', title: 'Laporan', icon: '📝' },
    { id: 'profil', title: 'Profil', icon: '👤' }
  ],
  pengelola: [
    { id: 'beranda', title: 'Beranda', icon: '🏠' },
    { id: 'retribusi', title: 'Retribusi', icon: '💵' },
    { id: 'revitalisasi', title: 'Revitalisasi', icon: '🌿' },
    { id: 'profil', title: 'Profil', icon: '👤' }
  ],
  relawan: [
    { id: 'mata-air', title: 'Mata Air', icon: '🗺️' },
    { id: 'lapor', title: 'Lapor', icon: '📷' },
    { id: 'riwayat', title: 'Riwayat', icon: '⏱️' },
    { id: 'profil', title: 'Profil', icon: '👤' }
  ],
  donatur: [
    { id: 'program', title: 'Program', icon: '❤️' },
    { id: 'donasi', title: 'Donasi Saya', icon: '🎁' },
    { id: 'detail', title: 'Detail', icon: 'ℹ️' },
    { id: 'profil', title: 'Profil', icon: '👤' }
  ],
  admin: [
    { id: 'ringkasan', title: 'Ringkasan', icon: '⚡' },
    { id: 'verifikasi', title: 'Verifikasi', icon: '✅' },
    { id: 'kelola', title: 'Kelola', icon: '🛡️' },
    { id: 'profil', title: 'Profil', icon: '👤' }
  ]
};

export function renderRoleBottomTabBar(activeRole, activeSubTab = '') {
  const tabs = ROLE_SUBTABS[activeRole] || ROLE_SUBTABS.warga;
  const currentTab = activeSubTab || tabs[0].id;

  return `
    <nav class="role-bottom-tab-bar" aria-label="Role Internal Navigation">
      <div class="role-tab-bar-container">
        ${tabs.map(tab => `
          <button type="button" class="role-tab-bar-item ${currentTab === tab.id ? 'active' : ''}" data-subtab="${tab.id}">
            <span class="role-tab-icon">${tab.icon}</span>
            <span class="role-tab-title">${tab.title}</span>
          </button>
        `).join('')}
      </div>
    </nav>
  `;
}
