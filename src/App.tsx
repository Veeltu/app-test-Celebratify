import React, { useState } from 'react';
import { Venue, BookingRequest, OfferPackage, FilterState, AuthUser, MenuDishChoiceGroup } from './types';
import { INITIAL_VENUES, INITIAL_BOOKINGS } from './data/mockVenues';
import { MobileShell } from './components/mobile/MobileShell';
import { TabType, isManagerTab, tabToAdminSection } from './components/mobile/BottomNav';
import { ToastNotification } from './components/mobile/NotificationBanner';
import { MobileSearchView } from './components/mobile/views/MobileSearchView';
import { MobileVenueDetailModal } from './components/mobile/views/MobileVenueDetailModal';
import { MobileCompareView } from './components/mobile/views/MobileCompareView';
import { MobileAIChatView } from './components/mobile/views/MobileAIChatView';
import { MobileBookingsView } from './components/mobile/views/MobileBookingsView';
import { MobileVenueAdminView } from './components/mobile/views/MobileVenueAdminView';
import { MobileBookingModal } from './components/mobile/views/MobileBookingModal';
import { MobileAuthModal } from './components/mobile/views/MobileAuthModal';

export function App() {
  // Application Data State
  const [venues, setVenues] = useState<Venue[]>(INITIAL_VENUES);
  const [bookings, setBookings] = useState<BookingRequest[]>(INITIAL_BOOKINGS);
  
  // User & Navigation State
  const [user, setUser] = useState<AuthUser | null>({
    id: 'usr_google_1',
    name: 'Jan Kowalski',
    email: 'jan.kowalski@gmail.com',
    role: 'client',
    provider: 'google',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
  });
  const [role, setRole] = useState<'client' | 'manager'>('client');
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Search & Filter State
  const [filters, setFilters] = useState<FilterState>({
    city: 'Wszystkie',
    eventType: 'wszystkie',
    date: '',
    guests: 0,
    maxPricePerGuest: 0
  });

  // Venue Detail & Booking Flow Modals
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [compareList, setCompareList] = useState<string[]>(['v1', 'v2']); // pre-populate 2 for instant comparison showcase
  const [bookingModalData, setBookingModalData] = useState<{
    venue: Venue;
    package: OfferPackage;
    date?: string;
  } | null>(null);

  // Toast Push Notification State
  const [notification, setNotification] = useState<ToastNotification | null>({
    id: 'n1',
    title: 'Witaj w PartySpot Mobile!',
    message: 'Szukaj sali na wesele lub chrzciny, porównuj cenniki i rezerwuj bez prowizji.',
    type: 'info',
    timestamp: 'Teraz'
  });

  const showNotification = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({
      id: `toast_${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  // Compare Toggle
  const handleToggleCompare = (venueId: string) => {
    setCompareList(prev => {
      if (prev.includes(venueId)) {
        return prev.filter(id => id !== venueId);
      }
      if (prev.length >= 3) {
        showNotification('Limit porównywarki', 'Możesz porównywać maksymalnie 3 lokale jednocześnie.', 'info');
        return prev;
      }
      showNotification('Dodano do porównania', 'Lokal znajduje się w zakładce Porównaj.', 'info');
      return [...prev, venueId];
    });
  };

  const handleRemoveFromCompare = (venueId: string) => {
    setCompareList(prev => prev.filter(id => id !== venueId));
  };

  // Booking Actions
  const handleStartBooking = (venue: Venue, selectedPackage: OfferPackage, selectedDate?: string) => {
    setSelectedVenue(null);
    setBookingModalData({
      venue,
      package: selectedPackage,
      date: selectedDate
    });
  };

  const handleSubmitBooking = (newBookingData: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: BookingRequest = {
      ...newBookingData,
      id: `b_${Date.now()}`,
      status: 'Oczekuje',
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    setBookingModalData(null);
    setActiveTab('bookings');

    showNotification(
      'Rezerwacja wysłana!',
      `Zgłoszenie na dzień ${newBooking.date} trafiło do menedżera lokalu ${newBooking.venueName}. Status: Oczekuje.`,
      'success'
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Anulowana' } : b));
    showNotification('Zgłoszenie anulowane', 'Twój wniosek o rezerwację został anulowany.', 'info');
  };

  // Manager Venue Admin Actions
  const handleAcceptBooking = (bookingId: string, note?: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Potwierdzona', venueResponseNote: note } : b));
    const targetBooking = bookings.find(b => b.id === bookingId);
    showNotification(
      'Rezerwacja ZAACCEPTED!',
      `Zaakceptowano rezerwację dla ${targetBooking?.clientName}. Powiadomienie e-mail/push zostało wysłane.`,
      'success'
    );
  };

  const handleRejectBooking = (bookingId: string, note?: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Odrzucona', venueResponseNote: note } : b));
    showNotification('Rezerwacja Odrzucona', 'Powiadomiono klienta o braku dostępności terminu.', 'error');
  };

  const handleUpdateVenuePrice = (venueId: string, packageId: string, newPrice: number) => {
    setVenues(prev => prev.map(v => {
      if (v.id !== venueId) return v;
      const updatedPackages = v.packages.map(p => p.id === packageId ? { ...p, pricePerPerson: newPrice } : p);
      const minPrice = Math.min(...updatedPackages.map(p => p.pricePerPerson));
      return { ...v, packages: updatedPackages, priceFrom: minPrice };
    }));
    showNotification('Cennik zaktualizowany', 'Zapisano nową stawkę za osobę w ofercie ustandaryzowanej.', 'success');
  };

  const handleUpdatePackageMenu = (
    venueId: string,
    packageId: string,
    choiceGroups: MenuDishChoiceGroup[]
  ) => {
    setVenues((prev) =>
      prev.map((v) => {
        if (v.id !== venueId) return v;
        return {
          ...v,
          packages: v.packages.map((p) =>
            p.id === packageId ? { ...p, choiceGroups } : p
          ),
        };
      })
    );
    showNotification('Menu zaktualizowane', 'Zmiany w karcie dań są widoczne dla klientów.', 'success');
  };

  const handleToggleDateAvailability = (venueId: string, date: string) => {
    setVenues(prev => prev.map(v => {
      if (v.id !== venueId) return v;
      const isBlocked = v.blockedDates.includes(date);
      const newBlocked = isBlocked ? v.blockedDates.filter(d => d !== date) : [...v.blockedDates, date];
      const newAvailable = isBlocked ? [...v.availableDates, date] : v.availableDates.filter(d => d !== date);
      return { ...v, blockedDates: newBlocked, availableDates: newAvailable };
    }));
    showNotification('Kalendarz zmieniony', 'Zaktualizowano dostępność terminu w kalendarzu lokalu.', 'info');
  };

  const handleToggleRole = () => {
    const nextRole = role === 'client' ? 'manager' : 'client';
    setRole(nextRole);
    if (nextRole === 'manager') {
      setActiveTab('admin');
      showNotification('Przełączono na Tryb Lokalu', 'Jesteś teraz w panelu zarządzania restauracją.', 'info');
    } else {
      setActiveTab('search');
      showNotification('Tryb Organizatora (Klienta)', 'Przeglądasz ofertę jako osoba szukająca lokalu.', 'info');
    }
  };

  const currentManagerVenue = venues.find(v => v.id === (user?.managedVenueId || 'v1')) || venues[0];
  const compareVenues = venues.filter(v => compareList.includes(v.id));
  const pendingBookingsCount = bookings.filter(b => b.venueId === currentManagerVenue.id && b.status === 'Oczekuje').length;

  return (
    <MobileShell
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      user={user}
      onOpenAuthModal={() => setIsAuthModalOpen(true)}
      compareCount={compareList.length}
      pendingBookingsCount={pendingBookingsCount}
      notification={notification}
      onDismissNotification={() => setNotification(null)}
      role={role}
      onToggleRole={handleToggleRole}
      overlay={
        <>
          {selectedVenue && (
            <MobileVenueDetailModal
              venue={venues.find((v) => v.id === selectedVenue.id) ?? selectedVenue}
              onClose={() => setSelectedVenue(null)}
              onStartBooking={handleStartBooking}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
            />
          )}

          {bookingModalData && (
            <MobileBookingModal
              venue={bookingModalData.venue}
              initialPackage={bookingModalData.package}
              initialDate={bookingModalData.date}
              onClose={() => setBookingModalData(null)}
              onSubmitBooking={handleSubmitBooking}
            />
          )}

          {isAuthModalOpen && (
            <MobileAuthModal
              user={user}
              onLogin={(loggedInUser) => {
                setUser(loggedInUser);
                setRole(loggedInUser.role);
                setIsAuthModalOpen(false);
                showNotification('Zalogowano pomyślnie', `Witaj ponownie, ${loggedInUser.name}!`, 'success');
              }}
              onLogout={() => {
                setUser(null);
                setRole('client');
                setIsAuthModalOpen(false);
                showNotification('Wylogowano', 'Zostałeś wylogowany z konta.', 'info');
              }}
              onClose={() => setIsAuthModalOpen(false)}
            />
          )}
        </>
      }
    >
      {/* Tab View Switcher */}
      {activeTab === 'search' && (
        <MobileSearchView
          venues={venues}
          filters={filters}
          onFilterChange={setFilters}
          onSelectVenue={setSelectedVenue}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
          onOpenAIChat={() => setActiveTab('chat')}
        />
      )}

      {activeTab === 'compare' && (
        <MobileCompareView
          compareVenues={compareVenues}
          onRemoveFromCompare={handleRemoveFromCompare}
          onSelectVenue={setSelectedVenue}
          onStartBooking={handleStartBooking}
        />
      )}

      {activeTab === 'chat' && (
        <MobileAIChatView
          venues={venues}
          onSelectVenue={setSelectedVenue}
          onApplyFilters={(newFilters) => {
            setFilters(prev => ({ ...prev, ...newFilters }));
            setActiveTab('search');
          }}
        />
      )}

      {activeTab === 'bookings' && (
        <MobileBookingsView
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
          onExploreVenues={() => setActiveTab('search')}
        />
      )}

      {isManagerTab(activeTab) && (
        <MobileVenueAdminView
          venue={currentManagerVenue}
          bookings={bookings}
          section={tabToAdminSection(activeTab)!}
          onAcceptBooking={handleAcceptBooking}
          onRejectBooking={handleRejectBooking}
          onUpdateVenuePrice={handleUpdateVenuePrice}
          onUpdatePackageMenu={handleUpdatePackageMenu}
          onToggleDateAvailability={handleToggleDateAvailability}
        />
      )}
    </MobileShell>
  );
}

export default App;
