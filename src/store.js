/**
 * BelikHub — Shared Reactive Store & Conrad Challenge Demo Seeder
 */

export const INITIAL_DATA = {
  activeRole: null, // null (public site view) or 'warga' | 'pengelola' | 'relawan' | 'donatur' | 'admin'
  currentUser: {
    id: 'usr_bismo_01',
    name: 'Bapak Slamet Raharjo',
    phone: '0812-3456-7890',
    village: 'Desa Bismo, Kec. Blado, Kab. Batang',
    linkedMeterCode: 'BSM-8921',
    householdId: 'KK-3325010901',
    role: 'warga'
  },
  springs: [
    {
      id: 'sp_bismo',
      name: 'Tuk Bismo',
      village: 'Bismo',
      district: 'Blado',
      currentDischarge: 24.5,
      baselineDischarge: 25.0,
      capacityPercent: 98,
      status: 'normal', // normal | warning | critical
      sensorUptime: 99.8,
      elevation: '1,420 mdpl',
      servedHouseholds: 380,
      coordinates: { lat: -7.0652, lng: 109.8451 }
    },
    {
      id: 'sp_silumut',
      name: 'Tuk Silumut',
      village: 'Wonomerto',
      district: 'Blado',
      currentDischarge: 18.2,
      baselineDischarge: 20.0,
      capacityPercent: 91,
      status: 'normal',
      sensorUptime: 99.4,
      elevation: '1,280 mdpl',
      servedHouseholds: 295,
      coordinates: { lat: -7.0583, lng: 109.8392 }
    },
    {
      id: 'sp_luwung',
      name: 'Tuk Luwung',
      village: 'Bismo',
      district: 'Blado',
      currentDischarge: 12.0,
      baselineDischarge: 16.0,
      capacityPercent: 75,
      status: 'warning',
      sensorUptime: 98.7,
      elevation: '1,350 mdpl',
      servedHouseholds: 185,
      coordinates: { lat: -7.0712, lng: 109.8512 }
    },
    {
      id: 'sp_kalisari',
      name: 'Tuk Kalisari',
      village: 'Gerlang',
      district: 'Blado',
      currentDischarge: 8.5,
      baselineDischarge: 14.0,
      capacityPercent: 60,
      status: 'critical',
      sensorUptime: 97.2,
      elevation: '1,560 mdpl',
      servedHouseholds: 210,
      coordinates: { lat: -7.0821, lng: 109.8645 }
    }
  ],
  bills: [
    {
      id: 'bill_nov_2026',
      period: 'November 2026',
      residentName: 'Bapak Slamet Raharjo',
      meterCode: 'BSM-8921',
      springId: 'sp_bismo',
      usageM3: 16,
      amount: 20000,
      status: 'unpaid', // unpaid | paid
      paidAt: null,
      paymentMethod: null
    },
    {
      id: 'bill_oct_2026',
      period: 'Oktober 2026',
      residentName: 'Bapak Slamet Raharjo',
      meterCode: 'BSM-8921',
      springId: 'sp_bismo',
      usageM3: 15,
      amount: 20000,
      status: 'paid',
      paidAt: '2026-10-08T10:14:00Z',
      paymentMethod: 'QRIS Rekening Desa'
    },
    {
      id: 'bill_sep_2026',
      period: 'September 2026',
      residentName: 'Bapak Slamet Raharjo',
      meterCode: 'BSM-8921',
      springId: 'sp_bismo',
      usageM3: 14,
      amount: 20000,
      status: 'paid',
      paidAt: '2026-09-06T14:30:00Z',
      paymentMethod: 'Tunai di Kantor Desa'
    }
  ],
  villageFinances: {
    collectionRate: 85, // 85%
    totalTarget: 7600000, // Rp 7.600.000 (380 KK x Rp 20.000)
    totalCollected: 6460000,
    maintenanceFundBalance: 18450000
  },
  reports: [
    {
      id: 'rep_001',
      reporterName: 'Warga Bismo (RT 02)',
      reportType: 'kebocoran',
      categoryLabel: 'Kebocoran Pipa Transmisi Hulu',
      description: 'Pipa transmisi 2 inch retak di lereng blok kebun teh dekat Tuk Bismo. Air menyembur deras.',
      coordinates: { lat: -7.0658, lng: 109.8459 },
      severity: 'mendesak',
      status: 'in_progress', // pending | in_progress | resolved
      photoUrl: '/assets/images/community.webp',
      createdAt: '2026-11-20T08:30:00Z'
    },
    {
      id: 'rep_002',
      reporterName: 'Relawan Green Patrol',
      reportType: 'longsor',
      categoryLabel: 'Ancaman Longsor / Sedimentasi',
      description: 'Dinding tebing penangkap air Tuk Luwung terkikis akibat hujan lebat, sedimen mulai masuk bak tampung.',
      coordinates: { lat: -7.0715, lng: 109.8519 },
      severity: 'sedang',
      status: 'pending',
      photoUrl: '/assets/images/home-adus.webp',
      createdAt: '2026-11-21T07:15:00Z'
    }
  ],
  campaigns: [
    {
      id: 'camp_001',
      title: 'Restorasi Hulu Tuk Bismo: Penanaman 1.000 Beringin & Rumput Vetiver',
      springId: 'sp_bismo',
      targetAmount: 50000000,
      collectedAmount: 41500000,
      progressPercent: 83,
      daysLeft: 14,
      status: 'active',
      description: 'Reboisasi sabuk hijau penyangga mata air Tuk Bismo untuk mencegah erosi dan menjaga stabilitas akuifer pegunungan Dieng utara.',
      timelineUpdates: [
        {
          date: '15 Nov 2026',
          title: 'Pembuatan 300 Lubang Tanam & Rorak Kompos',
          photo: '/assets/images/community.webp',
          note: 'Masyarakat Desa Bismo dan BUMDes Tirta menyelesaikan penggalian rorak air penampung limpasan hujan.'
        },
        {
          date: '02 Nov 2026',
          title: 'Pengiriman 1.000 Bibit Beringin Karet & Vetiver',
          photo: '/assets/images/home-homes.webp',
          note: 'Bibit bersertifikat tiba dari persemaian lokal Kabupaten Batang dan siap diaklimatisasi.'
        }
      ]
    },
    {
      id: 'camp_002',
      title: 'Pembangunan Bak Penangkap Air & Bronjong Tuk Silumut',
      springId: 'sp_silumut',
      targetAmount: 35000000,
      collectedAmount: 22750000,
      progressPercent: 65,
      daysLeft: 28,
      status: 'active',
      description: 'Perlindungan titik tangkapan mata air Tuk Silumut dari longsoran tebing dan perbaikan filter pasir alami.',
      timelineUpdates: [
        {
          date: '10 Nov 2026',
          title: 'Pemasangan Kawat Bronjong Batu Hulu',
          photo: '/assets/images/home-multifamily.webp',
          note: 'Material batu kali dipasang bersama teknisi PDAM Batang dan pemuda Wonomerto.'
        }
      ]
    }
  ],
  donations: [
    {
      id: 'don_101',
      campaignId: 'camp_001',
      donorName: 'PT Batang Hijau Lestari (CSR)',
      donorType: 'csr',
      amount: 15000000,
      status: 'verified',
      date: '2026-11-14T11:20:00Z',
      referenceNo: 'CSR-BHL-202611'
    },
    {
      id: 'don_102',
      campaignId: 'camp_001',
      donorName: 'Dr. Hendra Gunawan',
      donorType: 'individu',
      amount: 500000,
      status: 'pending', // pending verification in admin queue
      date: '2026-11-21T09:45:00Z',
      referenceNo: 'DON-IND-88219'
    }
  ]
};

const STORAGE_KEY = 'belikhub_demo_store_v1';

// In-memory state copy
let currentState = JSON.parse(JSON.stringify(INITIAL_DATA));
const subscribers = new Set();

// Safely initialize from localStorage in browser environment
function initStore() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        currentState = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial state', e);
    }
  }
}

initStore();

/**
 * Returns current snapshot of store state
 */
export function getStore() {
  return currentState;
}

/**
 * Updates partial state, persists, and notifies subscribers
 */
export function updateStore(partialState) {
  currentState = { ...currentState, ...partialState };

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }

  // Notify listeners
  subscribers.forEach(callback => {
    try {
      callback(currentState);
    } catch (err) {
      console.error('Error in store subscriber:', err);
    }
  });

  return currentState;
}

/**
 * Subscribes to store changes. Returns an unsubscribe function.
 */
export function subscribeStore(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

/**
 * Deterministically resets store to initial seed data
 */
export function resetStore() {
  currentState = JSON.parse(JSON.stringify(INITIAL_DATA));

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  }

  subscribers.forEach(callback => callback(currentState));
  return currentState;
}

/**
 * Validates GPS coordinates for Indonesia geographic boundaries
 * Latitude: -11.5 to 6.5
 * Longitude: 94.0 to 141.5
 */
export function validateIndonesiaCoordinates(lat, lng) {
  const nLat = Number(lat);
  const nLng = Number(lng);
  if (isNaN(nLat) || isNaN(nLng)) return false;
  return nLat >= -11.5 && nLat <= 6.5 && nLng >= 94.0 && nLng <= 141.5;
}
