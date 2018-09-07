// @flow
/* eslint-disable react/no-danger */
import React from "react";

type PropsT = {
  children: *,
  css: string[],
  scripts: string[],
  state: string,
  id: string
};

export default class Wrapper extends React.Component<PropsT> {
  static defaultProps = {
    css: [],
    scripts: [],
    state: "{}"
  };

  render() {
    const { children, scripts = [], css = [], state, id } = this.props;
    return (
      <div>
        {css.map(href => {
          return <link key={href} rel="stylesheet" href={urlPrefix + href} />;
        })}
        <div id={id} dangerouslySetInnerHTML={{ __html: children }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${state}`
          }}
        />
        {scripts.map(src => {
          return <script key={src} src={urlPrefix + src} />;
        })}
      </div>
    );
  }
}
