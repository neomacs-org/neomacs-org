import { Heart, ChevronRight, UserRound, UsersRound, UserPlus, Scale } from 'lucide-react';
import sponsorsData from '../data/sponsors.json';

const sponsorInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

type Sponsor = {
  login: string;
  name: string;
  avatarUrl: string;
  url: string;
};

const SponsorCardDense = ({ sponsor, past = false }: { sponsor: Sponsor; past?: boolean }) => {
  const duplicatesLogin =
    sponsor.name.trim().toLowerCase() === sponsor.login.toLowerCase();

  return (
    <a
      className={past ? 'sponsor-card-dense sponsor-card-past-dense' : 'sponsor-card-dense'}
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`@${sponsor.login}`}
    >
      <div className="sponsor-avatar-dense">
        {sponsor.avatarUrl ? (
          <img
            src={sponsor.avatarUrl}
            alt={sponsor.name}
            loading="lazy"
            className="avatar-img-dense"
          />
        ) : (
          <span className="initials-badge-dense">
            {sponsorInitials(sponsor.name)}
          </span>
        )}
      </div>
      <div className="sponsor-meta-dense">
        <span className="meta-name">{sponsor.name}</span>
        {!duplicatesLogin && (
          <span className="meta-login">@{sponsor.login}</span>
        )}
      </div>
    </a>
  );
};

export const SponsorsSection = () => {
  const { sample, sponsors, anonymousCount } = sponsorsData;
  // A sponsors.json committed before past sponsors existed must not white-page
  // the dev server — `vite dev` never runs tsc — so read it defensively.
  const pastSponsors = (sponsorsData as { pastSponsors?: Sponsor[] }).pastSponsors ?? [];

  return (
    <section id="sponsors" className="sponsors-section-dense">
      <div className="container">
        <div className="section-header-dense">
          <div className="section-label">
            <span className="mono-idx">[05]</span>
            <span className="mono-title">NEO_EMACS_SPONSORS</span>
          </div>
          <h2>Free Software.</h2>
          <p className="section-sub-dense">
            NEO Emacs is licensed under{' '}
            <a
              className="licence-badge-dense"
              href="https://github.com/eval-exec/neomacs?tab=GPL-3.0-1-ov-file"
              target="_blank"
              rel="noopener noreferrer"
              title="GPL-3.0 licence"
            >
              <Scale size={11} aria-hidden="true" />
              GPL-3.0
            </a>
            , the same licence as GNU Emacs.
          </p>
        </div>

        <div className="sponsor-actions-dense">
          <a
            className="sponsor-btn-dense"
            href="https://github.com/sponsors/eval-exec"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Heart size={14} fill="currentColor" />
            <span>Sponsor on GitHub</span>
            <ChevronRight size={13} />
          </a>
        </div>

        <div className="sponsors-grid-dense">
          {sponsors.map((sponsor) => (
            <SponsorCardDense key={sponsor.login} sponsor={sponsor} />
          ))}

          {anonymousCount > 0 && (
            <div
              className="sponsor-card-dense anon-card-dense"
              title={`${anonymousCount} anonymous supporters`}
            >
              <div className="sponsor-avatar-dense anon-glyph">
                {anonymousCount === 1 ? <UserRound size={18} /> : <UsersRound size={18} />}
              </div>
              <div className="sponsor-meta-dense">
                <span className="meta-name">{anonymousCount} Anonymous Supporters</span>
                <span className="meta-login">anonymous</span>
              </div>
            </div>
          )}

          <a
            className="sponsor-card-dense join-card-dense"
            href="https://github.com/sponsors/eval-exec"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="sponsor-avatar-dense join-glyph">
              <UserPlus size={16} />
            </div>
            <div className="sponsor-meta-dense">
              <span className="meta-name join-text">Become a Sponsor</span>
              <span className="meta-login">github.com/sponsors</span>
            </div>
          </a>
        </div>

        {/* The current sponsors above are the ask; this is the thank-you — so
            it sits below them, smaller and without a card of its own. */}
        {pastSponsors.length > 0 && (
          <div className="sponsors-past-dense">
            <h3 className="sponsors-past-heading-dense">Past sponsors</h3>
            <div className="sponsors-grid-dense sponsors-grid-past-dense">
              {pastSponsors.map((sponsor) => (
                <SponsorCardDense key={sponsor.login.toLowerCase()} sponsor={sponsor} past />
              ))}
            </div>
          </div>
        )}

        {sample && (
          <p className="sponsors-note-dense">
            [placeholder entries: set GH_TOKEN and run npm run fetch-sponsors]
          </p>
        )}
      </div>
    </section>
  );
};
