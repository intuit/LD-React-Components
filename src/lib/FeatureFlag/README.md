### FeatureFlag

Takes `flagKey` and `appFlags` as `props`, which is an object containing list of features.

### FeatureSwitch, FeatureCase and FeatureDefault

`FeatureSwitch` should be a child of `FeatureFlag` and can take `FeatureCase` and `FeatureDefault` as children.

`FeatureCase` component takes `condition` and `allowBreak`(a boolean) as props,
`condition` is the `case` feature, while `allowBreak` used as a `break`. The reason for name change is `case` and `break` are reserved words on JS.