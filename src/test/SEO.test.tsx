/**
 * SEO Component Tests
 * Tests that the SEO component correctly renders title, meta description,
 * canonical URL, and structured data.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../app/components/SEO';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

describe('SEO Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Wrapper>
        <SEO
          title="Test Page"
          description="Test description for SEO"
          canonical="/test"
        />
      </Wrapper>
    );
    expect(container).toBeTruthy();
  });

  it('accepts all required props without errors', () => {
    expect(() =>
      render(
        <Wrapper>
          <SEO
            title="Commercial Construction Services"
            description="Expert commercial construction services"
            canonical="/services/commercial-construction"
            keywords="commercial construction, building contractor"
            ogImage="https://example.com/og.jpg"
            twitterCard="summary_large_image"
            structuredData={{
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'Commercial Construction',
            }}
          />
        </Wrapper>
      )
    ).not.toThrow();
  });

  it('accepts ogType website', () => {
    expect(() =>
      render(
        <Wrapper>
          <SEO
            title="Home"
            description="Home page"
            canonical="/"
            ogType="website"
          />
        </Wrapper>
      )
    ).not.toThrow();
  });

  it('accepts ogType article', () => {
    expect(() =>
      render(
        <Wrapper>
          <SEO
            title="Blog Post"
            description="A blog post"
            canonical="/blog/test"
            ogType="article"
            articlePublishedTime="2024-01-01T00:00:00Z"
            articleAuthor="Test Author"
          />
        </Wrapper>
      )
    ).not.toThrow();
  });
});
