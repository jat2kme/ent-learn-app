/**
 * User Dropdown Component
 * Dynamic dropdown menu that fetches items from backend API based on user permissions
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, User, Settings, Shield, Loader2, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useTenant } from '@/hooks/useTenant';
import { authService } from '@/services/auth.service';
import { BRAND_CONFIG } from '@/config';
import { userMenuService, UserMenuItem } from '@/services/user-menu.service';
import { toast } from '@/utils/toast';
import { SYSTEM_CONFIG, UI_TEXT, HEADER_CONFIG } from '@/config';
import { useTheme } from '@/hooks/useTheme';
import { Menu, Star } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';


// Icon mapping for dynamic icons
const iconMap: Record<string, React.ComponentType<{ style?: React.CSSProperties; className?: string }>> = {
  User,
  Settings,
  Shield,
  LayoutDashboard,
};

interface UserDropdownProps {
  userName: string;
  userEmail: string;
  userRole: string;
  userInitials: string;
  avatarUrl?: string;
}

export function UserDropdown({
  userName,
  userEmail,
  userRole,
  userInitials,
  avatarUrl,
}: UserDropdownProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { currentOrganization } = useTenant();
  const { theme } = useTheme();
  const [menuItems, setMenuItems] = useState<UserMenuItem[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);

  // Determine if dark mode is active
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Load menu items from backend
  useEffect(() => {
    const loadMenuItems = async () => {
      if (!user?.id || !currentOrganization?.id) {
        setIsLoadingMenu(false);
        return;
      }

      setIsLoadingMenu(true);
      const { data, error } = await userMenuService.getUserMenuItems(
        user.id,
        currentOrganization.id
      );

      if (error) {
        console.error('Error loading menu items:', error);
        toast.error('Failed to load menu items');
      } else if (data) {
        setMenuItems(data);
      }
      setIsLoadingMenu(false);
    };

    loadMenuItems();
  }, [user?.id, currentOrganization?.id]);

  const handleLogout = async () => {
    try {
      // 1. SET LOGGING OUT METADATA
      useAuthStore.getState().setLoggingOut(true);

      // 2. CLEAR LOCAL STATE IMMEDIATELY
      // This prevents any "authenticated" checks from redirecting us back to dashboard
      // while we are navigating to login.
      useAuthStore.setState({ user: null, session: null, isAuthenticated: false });

      // 3. NAVIGATE IMMEDIATELY
      // Now that we are locally "logged out", navigate to the public login page.
      router.push('/login');

      // 4. CLEAN UP SERVER SESSION
      // Tell datsDB to kill the session on the server.
      const { error } = await authService.signOut();

      // 5. RESET LOGGING OUT FLAG
      useAuthStore.getState().logout();

      if (error) {
        console.error('Logout error:', error);
        // User is already on login page and locally logged out, so just log it.
      } else {
        toast.success(UI_TEXT.logout.successMessage);
      }
    } catch (error) {
      console.error('Logout exception:', error);
      // Ensure we are logged out locally even if exception
      useAuthStore.getState().logout();
      router.push('/login');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          style={{
            ...(isDark
              ? HEADER_CONFIG.profileButton.dark
              : HEADER_CONFIG.profileButton.light),
            color: 'hsl(var(--foreground))',
          }}
        >
          <Avatar
            style={{
              height: HEADER_CONFIG.avatar.container.height,
              width: HEADER_CONFIG.avatar.container.width,
              border: '2px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            {avatarUrl && <AvatarImage src={avatarUrl} alt={userName} />}
            <AvatarFallback style={HEADER_CONFIG.avatar.container}>
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div
            className="hidden md:flex md:flex-col md:items-start"
          >
            <span style={HEADER_CONFIG.text.name}>{userName}</span>
          </div>
          <Menu
            style={{ height: '16px', width: '16px', opacity: 0.7 }}
            className="md:hidden"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        variant="glass"
        className={`${HEADER_CONFIG.dropdown.content} w-[280px]`}
        style={HEADER_CONFIG.dropdown.contentStyle}
      >
        <DropdownMenuLabel>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          >
            <p style={HEADER_CONFIG.text.name}>{userName}</p>
            <p style={HEADER_CONFIG.text.role}>{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator style={HEADER_CONFIG.dropdown.separator as React.CSSProperties} />

        {/* Favorites Section */}
        <FavoritesList />
        <DropdownMenuSeparator style={HEADER_CONFIG.dropdown.separator as React.CSSProperties} />

        {/* Dynamic menu items from backend */}
        {isLoadingMenu ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          menuItems.map((item) => {
            if (item.is_separator) {
              return (
                <DropdownMenuSeparator
                  key={item.id}
                  style={HEADER_CONFIG.dropdown.separator as React.CSSProperties}
                />
              );
            }

            const IconComponent = iconMap[item.icon];

            return (
              <Link key={item.id} href={item.path}>
                <DropdownMenuItem style={{ cursor: 'pointer' }}>
                  {IconComponent && (
                    <IconComponent
                      style={{
                        marginRight: '0.5rem',
                        height: '16px',
                        width: '16px',
                      }}
                    />
                  )}
                  {item.label}
                </DropdownMenuItem>
              </Link>
            );
          })
        )}

        {/* Theme toggle for mobile */}
        <div style={{ padding: '0.5rem' }} className="md:hidden">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={HEADER_CONFIG.text.name}>{UI_TEXT.theme.label}</span>
            <ThemeToggle />
          </div>
        </div>

        <DropdownMenuSeparator style={HEADER_CONFIG.dropdown.separator as React.CSSProperties} />

        {/* Favorite Toggle Action */}
        <FavoriteToggleItem menuItems={menuItems} />

        <DropdownMenuSeparator style={HEADER_CONFIG.dropdown.separator as React.CSSProperties} />

        {/* Logout */}
        <DropdownMenuItem
          style={{ cursor: 'pointer', color: 'rgb(239, 68, 68)' }}
          className="focus:bg-destructive focus:text-destructive-foreground"
          onClick={handleLogout}
        >
          <LogOut
            style={{ marginRight: '0.5rem', height: '16px', width: '16px' }}
          />
          {UI_TEXT.logout.label}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FavoriteToggleItem({ menuItems }: { menuItems: UserMenuItem[] }) {
  const currentPath = usePathname();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(currentPath);

  // Check if current page is already in the main menu
  // Normalise paths by stripping trailing slashes for comparison if needed
  const isPageInMenu = menuItems.some(item => {
    if (item.is_separator) return false;
    // Simple match or strict match depending on requirement. Usually strict path match.
    return item.path === currentPath;
  });

  // If page is in standard menu, don't show "Add to favorite" (unless it's already a favorite, then maybe show remove? User said "do not show the add/remove favorite button")
  // "if any pages menu already added in the list other than favorite, do not show the add/remove favorite button"
  if (isPageInMenu) {
    return null;
  }

  // Helper to get a readable title from path
  const getPageTitle = (path: string) => {
    if (path === '/' || path === '') return 'Dashboard';

    // Remove trailing slash if present
    const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
    const segments = cleanPath.split('/').filter(Boolean);

    if (segments.length === 0) return 'Dashboard';

    const lastSegment = segments[segments.length - 1];
    // Convert kebab-case to Title Case (e.g., "user-profile" -> "User Profile")
    return lastSegment
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let title = document.title.split('|')[0].trim();

    // If title is generic or empty, derive from path
    if (!title || title === 'Vite + React' || title === BRAND_CONFIG.name) {
      title = getPageTitle(currentPath);
    }

    toggleFavorite({
      path: currentPath,
      title: title || 'Page', // Fallback to 'Page' if somehow everything fails
    });
  };

  return (
    <DropdownMenuItem style={{ cursor: 'pointer' }} onClick={handleToggle}>
      <Star
        style={{ marginRight: '0.5rem', height: '16px', width: '16px' }}
        className={isFav ? "text-yellow-400 fill-yellow-400" : ""}
      />
      {isFav ? "Remove from favorites" : "Add to favorites"}
    </DropdownMenuItem>
  );
}

function FavoritesList() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) return null;
  if (!favorites.length) return null;

  return (
    <>
      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
        Favorites
      </div>
      {favorites.slice(0, 5).map((fav) => {
        // Safety check for malformed data
        if (!fav.value || typeof fav.value.path !== 'string') return null;

        const displayTitle = (typeof fav.value.title === 'string' && fav.value.title)
          ? fav.value.title
          : fav.value.path;

        return (
          <Link key={fav.id} href={fav.value.path}>
            <DropdownMenuItem style={{ cursor: 'pointer' }}>
              <Star
                style={{
                  marginRight: '0.5rem',
                  height: '16px',
                  width: '16px',
                }}
                className="text-yellow-400 fill-yellow-400"
              />
              <span className="truncate max-w-[150px]">
                {displayTitle}
              </span>
            </DropdownMenuItem>
          </Link>
        );
      })}
    </>
  );
}
